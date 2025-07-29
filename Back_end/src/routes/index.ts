import { Router } from 'express';

import userRoutes from './UserRoutes';
import salonRoutes from './SalonRoutes';
import serviceRoutes from './serviceRoutes';
import reservationRoutes from './ReservationRoutes';
// import reviewRoutes from './Review.routes';
// import messageRoutes from './Message.routes';
import adminRequestRoutes from './adminRequestRoutes';
import coiffeurRequestRoutes from './coiffeurRequestRoutes';

const router = Router();
router.use('/users', userRoutes);
router.use('/salons', salonRoutes);
router.use('/services', serviceRoutes);
router.use('/reservations', reservationRoutes);
// router.use('/reviews', reviewRoutes);
// router.use('/messages', messageRoutes);
router.use('/admin-requests', adminRequestRoutes);
router.use('/coiffeur-requests', coiffeurRequestRoutes);

export default router;
