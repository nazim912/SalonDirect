import { Router } from 'express';
import { adminRequestController } from '../controllers/AdminRequestController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/demander', authMiddleware, adminRequestController.demanderAdmin.bind(adminRequestController));
router.get('/', authMiddleware, adminRequestController.voirDemandes.bind(adminRequestController));
router.put('/:id', authMiddleware, adminRequestController.traiter.bind(adminRequestController));

export default router;
