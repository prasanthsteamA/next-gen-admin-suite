import { Router } from 'express';
import { verifyToken, requireRoles } from '../auth/middleware';

const usersRouter = Router();
usersRouter.use(verifyToken);

usersRouter.get('/', requireRoles('admin', 'manager'), async (req, res) => {
  res.json({ success: true, data: [] });
});

usersRouter.get('/:id', async (req, res) => {
  res.json({ success: true, data: null });
});

usersRouter.put('/:id', async (req, res) => {
  res.json({ success: true, message: 'User updated' });
});

usersRouter.delete('/:id', requireRoles('admin'), async (req, res) => {
  res.json({ success: true, message: 'User deleted' });
});

export default usersRouter;
