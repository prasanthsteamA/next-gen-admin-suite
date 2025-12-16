import { Router } from 'express';
import { verifyToken } from '../auth/middleware';

const chargingStationsRouter = Router();
chargingStationsRouter.use(verifyToken);

chargingStationsRouter.get('/', async (req, res) => {
  res.json({ success: true, data: [] });
});

chargingStationsRouter.get('/nearby', async (req, res) => {
  res.json({ success: true, data: [] });
});

chargingStationsRouter.get('/:id', async (req, res) => {
  res.json({ success: true, data: null });
});

chargingStationsRouter.post('/', async (req, res) => {
  res.json({ success: true, message: 'Station created' });
});

chargingStationsRouter.put('/:id', async (req, res) => {
  res.json({ success: true, message: 'Station updated' });
});

export default chargingStationsRouter;
