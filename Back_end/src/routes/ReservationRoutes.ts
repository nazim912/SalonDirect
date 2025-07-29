import { Router } from 'express';
import { reservationController } from '../controllers/ReservationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, reservationController.getAll.bind(reservationController));
router.get('/:id', authMiddleware, reservationController.getById.bind(reservationController));
router.post('/', authMiddleware, reservationController.create.bind(reservationController));
router.put('/:id', authMiddleware, reservationController.update.bind(reservationController));
router.delete('/:id', authMiddleware, reservationController.delete.bind(reservationController));
router.get('/salon/:salonId', authMiddleware, reservationController.getBySalon.bind(reservationController));

router.get('/client/reservations', authMiddleware, reservationController.getClientReservations.bind(reservationController));
router.post('/:id/cancel', authMiddleware, reservationController.cancel.bind(reservationController));

export default router;
