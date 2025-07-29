import { Request, Response } from 'express';
import { adminRequestService } from '../services/AdminRequestService';
import { UserService } from '../services/UserService';
import BaseController from './BaseController';
import AdminRequest from '../models/AdminRequest';
import User from '../models/User';

export class AdminRequestController extends BaseController<AdminRequest> {
  constructor() {
    super(adminRequestService, 'Demande admin');
  }

  async demanderAdmin(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;

      const demande = await adminRequestService.demander(userId);
      res.status(201).json({ message: 'Demande envoyée avec succès', data: demande });
    } catch (err: any) {
      res.status(400).json({ erreur: err.message });
    }
  }

  async voirDemandes(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      if (user.role !== 'admin') {
        return res.status(403).json({ erreur: 'Accès refusé' });
      }

      const demandes = await AdminRequest.findAll({
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
      });

      res.json({ status: 'success', data: demandes });
    } catch (err: any) {
      res.status(500).json({ erreur: err.message });
    }
  }

  async traiter(req: Request, res: Response) {
    try {
        const admin = (req as any).user;
        if (admin.role !== 'admin') {
        return res.status(403).json({ erreur: 'Accès refusé' });
        }

        const { id } = req.params;
        const { approuvée, motif } = req.body;

        const resultat = await adminRequestService.traiterDemande(+id, approuvée, motif);

        if (approuvée) {
        console.log(`Mise à jour du rôle de l'utilisateur ${resultat.userId} en admin`);
        await new UserService(User).updateUserRole(resultat.userId, 'admin');
        }

        res.json({ message: 'Demande traitée', data: resultat });
    } catch (err: any) {
        res.status(400).json({ erreur: err.message });
    }
    }

}

export const adminRequestController = new AdminRequestController();
