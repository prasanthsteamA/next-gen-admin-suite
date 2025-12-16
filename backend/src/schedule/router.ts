import { Router } from 'express';
import { verifyToken } from '../auth/middleware';

const scheduleRouter = Router();
scheduleRouter.use(verifyToken);

scheduleRouter.get('/', async (req, res) => {
  res.json({ success: true, data: [] });
});

scheduleRouter.get('/:id', async (req, res) => {
  res.json({ success: true, data: null });
});

scheduleRouter.post('/', async (req, res) => {
  res.json({ success: true, message: 'Schedule created' });
});

scheduleRouter.put('/:id', async (req, res) => {
  res.json({ success: true, message: 'Schedule updated' });
});

scheduleRouter.delete('/:id', async (req, res) => {
  res.json({ success: true, message: 'Schedule deleted' });
});

export default scheduleRouter;
