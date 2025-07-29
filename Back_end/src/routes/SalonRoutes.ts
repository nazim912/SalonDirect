import { Router } from 'express';
import { salonController } from '../controllers/SalonController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', salonController.getAll.bind(salonController));
router.get('/:id', salonController.getById.bind(salonController));

router.post('/', authMiddleware, salonController.create.bind(salonController));
router.put('/:id', authMiddleware, salonController.update.bind(salonController));
router.delete('/:id', authMiddleware, salonController.delete.bind(salonController));

export default router;
