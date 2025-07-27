import { Router } from 'express';
import { userController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/signup', userController.signup.bind(userController));
router.post('/signin', userController.signin.bind(userController));
router.get('/me', authMiddleware, userController.getMe.bind(userController));

export default router;
