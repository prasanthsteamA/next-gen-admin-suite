import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { settings } from '../settings';

// Database connection pool
let pool: Pool | null = null;

/**
 * Initialize database connection pool
 */
export function initializePool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: settings.database.host,
      port: settings.database.port,
      database: settings.database.name,
      user: settings.database.user,
      password: settings.database.password,
      max: settings.database.maxConnections,
      idleTimeoutMillis: settings.database.idleTimeout,
      connectionTimeoutMillis: settings.database.connectionTimeout,
    });

    // Pool event handlers
    pool.on('connect', () => {
      console.log('📦 New database connection established');
    });

    pool.on('error', (err: Error) => {
      console.error('❌ Unexpected database pool error:', err);
    });

    pool.on('remove', () => {
      console.log('📤 Database connection removed from pool');
    });

    console.log('✅ Database pool initialized');
  }

  return pool;
}

/**
 * Get database pool instance
 */
export function getPool(): Pool {
  if (!pool) {
    return initializePool();
  }
  return pool;
}

/**
 * Execute a query with parameters
 */
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const dbPool = getPool();
  const start = Date.now();

  try {
    const result = await dbPool.query<T>(text, params);
    const duration = Date.now() - start;

    // Log slow queries
    if (duration > 1000) {
      console.warn(`⚠️ Slow query (${duration}ms):`, text.substring(0, 100));
    }

    return result;
  } catch (error) {
    console.error('❌ Query error:', error);
    console.error('Query:', text.substring(0, 200));
    throw error;
  }
}

/**
 * Execute a single row query
 */
export async function queryOne<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<T | null> {
  const result = await query<T>(text, params);
  return result.rows[0] || null;
}

/**
 * Execute a query and return all rows
 */
export async function queryAll<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const result = await query<T>(text, params);
  return result.rows;
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient(): Promise<PoolClient> {
  const dbPool = getPool();
  const client = await dbPool.connect();
  return client;
}

/**
 * Execute a transaction
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await getClient();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Build WHERE clause from filters
 */
export function buildWhereClause(
  filters: Record<string, any>,
  startIndex: number = 1
): { clause: string; values: any[]; nextIndex: number } {
  const conditions: string[] = [];
  const values: any[] = [];
  let paramIndex = startIndex;

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null) continue;

    // Handle special operators
    if (typeof value === 'object' && !Array.isArray(value)) {
      if ('$gt' in value) {
        conditions.push(`${key} > $${paramIndex++}`);
        values.push(value.$gt);
      }
      if ('$gte' in value) {
        conditions.push(`${key} >= $${paramIndex++}`);
        values.push(value.$gte);
      }
      if ('$lt' in value) {
        conditions.push(`${key} < $${paramIndex++}`);
        values.push(value.$lt);
      }
      if ('$lte' in value) {
        conditions.push(`${key} <= $${paramIndex++}`);
        values.push(value.$lte);
      }
      if ('$ne' in value) {
        conditions.push(`${key} != $${paramIndex++}`);
        values.push(value.$ne);
      }
      if ('$like' in value) {
        conditions.push(`${key} ILIKE $${paramIndex++}`);
        values.push(`%${value.$like}%`);
      }
      if ('$in' in value && Array.isArray(value.$in)) {
        const placeholders = value.$in.map(() => `$${paramIndex++}`).join(', ');
        conditions.push(`${key} IN (${placeholders})`);
        values.push(...value.$in);
      }
    } else if (Array.isArray(value)) {
      const placeholders = value.map(() => `$${paramIndex++}`).join(', ');
      conditions.push(`${key} IN (${placeholders})`);
      values.push(...value);
    } else {
      conditions.push(`${key} = $${paramIndex++}`);
      values.push(value);
    }
  }

  return {
    clause: conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '',
    values,
    nextIndex: paramIndex,
  };
}

/**
 * Build ORDER BY clause
 */
export function buildOrderByClause(
  sortBy?: string,
  sortOrder: 'ASC' | 'DESC' = 'ASC',
  allowedFields: string[] = []
): string {
  if (!sortBy) return '';

  // Validate field to prevent SQL injection
  if (allowedFields.length > 0 && !allowedFields.includes(sortBy)) {
    return '';
  }

  return `ORDER BY ${sortBy} ${sortOrder}`;
}

/**
 * Build pagination clause
 */
export function buildPaginationClause(
  limit: number,
  offset: number,
  paramIndex: number
): { clause: string; values: number[]; nextIndex: number } {
  return {
    clause: `LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    values: [limit, offset],
    nextIndex: paramIndex + 2,
  };
}

/**
 * Close the database pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('📦 Database pool closed');
  }
}

/**
 * Health check for database connection
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const result = await query('SELECT 1 as health');
    return result.rows[0]?.health === 1;
  } catch (error) {
    console.error('❌ Database health check failed:', error);
    return false;
  }
}

export default {
  initializePool,
  getPool,
  query,
  queryOne,
  queryAll,
  getClient,
  transaction,
  buildWhereClause,
  buildOrderByClause,
  buildPaginationClause,
  closePool,
  healthCheck,
};
