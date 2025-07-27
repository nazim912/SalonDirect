import { Router } from 'express';

import userRoutes from './UserRoutes';
// import salonRoutes from './Salon.routes';
// import serviceRoutes from './Service.routes';
// import reservationRoutes from './Reservation.routes';
// import reviewRoutes from './Review.routes';
// import messageRoutes from './Message.routes';
// import adminRequestRoutes from './AdminRequest.routes';

const router = Router();
router.use('/users', userRoutes);
// router.use('/salons', salonRoutes);
// router.use('/services', serviceRoutes);
// router.use('/reservations', reservationRoutes);
// router.use('/reviews', reviewRoutes);
// router.use('/messages', messageRoutes);
// router.use('/admin-requests', adminRequestRoutes);

export default router;
