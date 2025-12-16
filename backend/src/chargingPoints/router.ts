import { Router } from 'express';
import { verifyToken } from '../auth/middleware';

const chargingPointsRouter = Router();
chargingPointsRouter.use(verifyToken);

chargingPointsRouter.get('/', async (req, res) => {
  res.json({ success: true, data: [], message: 'Charging points endpoint' });
});

chargingPointsRouter.get('/:id', async (req, res) => {
  res.json({ success: true, data: null });
});

chargingPointsRouter.post('/', async (req, res) => {
  res.json({ success: true, message: 'Charging point created' });
});

chargingPointsRouter.put('/:id', async (req, res) => {
  res.json({ success: true, message: 'Charging point updated' });
});

export default chargingPointsRouter;
