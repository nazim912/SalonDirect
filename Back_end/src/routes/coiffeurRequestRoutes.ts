import { Router } from 'express';
import { coiffeurRequestController } from '../controllers/CoiffeurRequestController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/demander', authMiddleware, coiffeurRequestController.demanderCoiffeur.bind(coiffeurRequestController));
router.get('/', authMiddleware, coiffeurRequestController.voirDemandes.bind(coiffeurRequestController));
router.put('/:id', authMiddleware, coiffeurRequestController.traiter.bind(coiffeurRequestController));

export default router;
