import { Request, Response } from 'express';
import { userService } from '../services/UserService';

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ status: 'success', data: user });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await userService.authenticate(email, password);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        status: 'success',
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          token,
        },
      });
    } catch (e: any) {
      res.status(401).json({ status: 'error', message: e.message });
    }
  }

  async getMe(req: Request, res: Response) {
    const userPayload = (req as any).user;
    if (!userPayload?.id)
      return res.status(401).json({ message: 'Non authentifié' });

    const user = await userService.findById(userPayload.id);
    if (!user)
      return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.json({ status: 'success', data: user });
  }
}

export const userController = new UserController();
