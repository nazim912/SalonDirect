import { Request, Response } from 'express';
import BaseController from './BaseController';
import { salonService } from '../services/SalonService';
import Salon from '../models/Salon';

class SalonController extends BaseController<Salon> {
  constructor() {
    super(salonService, 'Salon');
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const salon = await salonService.updateSalon(+req.params.id, userId, req.body);
      res.json({ status: 'success', data: salon });
    } catch (e: any) {
      if (e.message === 'Salon introuvable') {
        res.status(404).json({ status: 'error', message: e.message });
      } else {
        res.status(403).json({ status: 'error', message: e.message });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      await salonService.deleteSalon(+req.params.id, userId);
      res.json({ status: 'success', message: 'Salon supprimé' });
    } catch (e: any) {
      if (e.message === 'Salon introuvable') {
        res.status(404).json({ status: 'error', message: e.message });
      } else {
        res.status(403).json({ status: 'error', message: e.message });
      }
    }
  }
}

export const salonController = new SalonController();
