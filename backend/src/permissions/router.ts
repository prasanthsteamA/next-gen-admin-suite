import { Router } from 'express';
import { verifyToken, requireRoles } from '../auth/middleware';

const permissionsRouter = Router();
permissionsRouter.use(verifyToken);

permissionsRouter.get('/', requireRoles('admin'), async (req, res) => {
  res.json({ success: true, data: [] });
});

permissionsRouter.post('/', requireRoles('admin'), async (req, res) => {
  res.json({ success: true, message: 'Permission assigned' });
});

permissionsRouter.delete('/:id', requireRoles('admin'), async (req, res) => {
  res.json({ success: true, message: 'Permission removed' });
});

export default permissionsRouter;
