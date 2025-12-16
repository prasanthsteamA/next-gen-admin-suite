import { Router } from 'express';
import { verifyToken } from '../auth/middleware';

const chargingSessionsRouter = Router();
chargingSessionsRouter.use(verifyToken);

chargingSessionsRouter.get('/', async (req, res) => {
  res.json({ success: true, data: [], message: 'Charging sessions' });
});

chargingSessionsRouter.get('/active', async (req, res) => {
  res.json({ success: true, data: [] });
});

chargingSessionsRouter.get('/:id', async (req, res) => {
  res.json({ success: true, data: null });
});

chargingSessionsRouter.post('/', async (req, res) => {
  res.json({ success: true, message: 'Session created' });
});

chargingSessionsRouter.put('/:id/stop', async (req, res) => {
  res.json({ success: true, message: 'Session stopped' });
});

export default chargingSessionsRouter;
