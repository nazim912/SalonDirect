import { Router } from 'express';
import { serviceController } from '../controllers/ServiceController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', serviceController.getAll.bind(serviceController));
router.get('/:id', serviceController.getById.bind(serviceController));
router.post('/', authMiddleware, serviceController.create.bind(serviceController));
router.put('/:id', authMiddleware, serviceController.update.bind(serviceController));
router.delete('/:id', authMiddleware, serviceController.delete.bind(serviceController));

export default router;
