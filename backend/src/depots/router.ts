import { Router } from 'express';
import { verifyToken } from '../auth/middleware';

const depotsRouter = Router();
depotsRouter.use(verifyToken);

depotsRouter.get('/', async (req, res) => {
  res.json({ success: true, data: [] });
});

depotsRouter.get('/:id', async (req, res) => {
  res.json({ success: true, data: null });
});

depotsRouter.get('/:id/vehicles', async (req, res) => {
  res.json({ success: true, data: [] });
});

depotsRouter.post('/', async (req, res) => {
  res.json({ success: true, message: 'Depot created' });
});

depotsRouter.put('/:id', async (req, res) => {
  res.json({ success: true, message: 'Depot updated' });
});

export default depotsRouter;
