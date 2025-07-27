import { Router } from 'express';
import { adminRequestController } from '../controllers/AdminRequestController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, adminRequestController.getAll.bind(adminRequestController));
router.get('/:id', authMiddleware, adminRequestController.getById.bind(adminRequestController));
router.post('/', authMiddleware, adminRequestController.create.bind(adminRequestController));
router.put('/:id', authMiddleware, adminRequestController.update.bind(adminRequestController));
router.delete('/:id', authMiddleware, adminRequestController.delete.bind(adminRequestController));
router.post('/demander', authMiddleware, adminRequestController.demanderAdmin.bind(adminRequestController));
router.get('/demandes/all', authMiddleware, adminRequestController.voirDemandes.bind(adminRequestController));
router.post('/traiter/:id', authMiddleware, adminRequestController.traiter.bind(adminRequestController));

export default router;