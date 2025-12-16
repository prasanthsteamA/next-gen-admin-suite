import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { settings } from '../settings';

interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Lambda Authorizer for API Gateway
 */
export async function handler(
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> {
  try {
    const token = extractToken(event.authorizationToken);
    
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, settings.jwt.secret) as JwtPayload;

    return generatePolicy(decoded.userId, 'Allow', event.methodArn, {
      userId: decoded.userId,
      email: decoded.email,
    });
  } catch (error) {
    console.error('Authorization failed:', error);
    return generatePolicy('unauthorized', 'Deny', event.methodArn);
  }
}

/**
 * Extract token from authorization header
 */
function extractToken(authorizationToken: string): string | null {
  if (!authorizationToken) {
    return null;
  }

  const parts = authorizationToken.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return null;
  }

  return parts[1];
}

/**
 * Generate IAM policy document
 */
function generatePolicy(
  principalId: string,
  effect: 'Allow' | 'Deny',
  resource: string,
  context?: Record<string, string>
): APIGatewayAuthorizerResult {
  const authResponse: APIGatewayAuthorizerResult = {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };

  if (context) {
    authResponse.context = context;
  }

  return authResponse;
}

export default { handler };
