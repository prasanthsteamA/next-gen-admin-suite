import { Router } from 'express';
import { verifyToken } from '../auth/middleware';

const alertsRouter = Router();
alertsRouter.use(verifyToken);

alertsRouter.get('/', async (req, res) => {
  res.json({ success: true, data: [], message: 'Alerts endpoint' });
});

alertsRouter.get('/:id', async (req, res) => {
  res.json({ success: true, data: null, message: 'Get alert by ID' });
});

alertsRouter.post('/:id/acknowledge', async (req, res) => {
  res.json({ success: true, message: 'Alert acknowledged' });
});

alertsRouter.delete('/:id', async (req, res) => {
  res.json({ success: true, message: 'Alert deleted' });
});

export default alertsRouter;
