import { Router } from 'express';
import { verifyToken, requireRoles } from '../auth/middleware';

const settingsRouter = Router();
settingsRouter.use(verifyToken);

settingsRouter.get('/', async (req, res) => {
  res.json({ success: true, data: { clientName: 'IRIS Fleet', currency: 'INR', timezone: 'Asia/Kolkata' } });
});

settingsRouter.put('/', requireRoles('admin'), async (req, res) => {
  res.json({ success: true, message: 'Settings updated' });
});

export default settingsRouter;
