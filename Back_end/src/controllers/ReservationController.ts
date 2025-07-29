import { Request, Response } from 'express';
import { reservationService } from '../services/ReservationService';
import BaseController from './BaseController';
import Reservation from '../models/Reservation';

class ReservationController extends BaseController<Reservation> {
  constructor() {
    super(reservationService, 'Réservation');
  }

  async getClientReservations(req: Request, res: Response) {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Non authentifié' });

    const reservations = await reservationService.getClientReservations(userId);
    res.json({ status: 'success', data: reservations });
  }

  async cancel(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const id = +req.params.id;
      const result = await reservationService.cancelReservation(id, userId);
      res.json({ status: 'success', data: result });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const clientId = (req as any).user?.id;
      if (!clientId) {
        res.status(401).json({ message: 'Non authentifié' });
        return;
      }

      const dataWithClient = {
        ...req.body,
        clientId,
      };

      const reservation = await reservationService.createReservation(dataWithClient);
      res.status(201).json({ status: 'success', data: reservation });
    } catch (e: any) {
      res.status(400).json({ status: 'error', message: e.message });
    }
  }
  async getBySalon(req: Request, res: Response) {
    try {
        const userId = (req as any).user?.id;
        const salonId = +req.params.salonId;
        const reservations = await reservationService.getReservationsBySalon(salonId);
        res.json({ status: 'success', data: reservations });
        } catch (e: any) {
            res.status(400).json({ status: 'error', message: e.message });
        }
    }
}

export const reservationController = new ReservationController();
