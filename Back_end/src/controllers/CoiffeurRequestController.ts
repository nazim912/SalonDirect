import { Request, Response } from 'express';
import { coiffeurRequestService } from '../services/CoiffeurRequestService';
import BaseController from './BaseController';
import CoiffeurRequest from '../models/CoiffeurRequest';
import User from '../models/User';

export class CoiffeurRequestController extends BaseController<CoiffeurRequest> {
  constructor() {
    super(coiffeurRequestService, 'Demande coiffeur');
  }

  async demanderCoiffeur(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { description } = req.body;

      const demande = await coiffeurRequestService.demander(userId, description);
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

      const demandes = await CoiffeurRequest.findAll({
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
      const { approuvee, motif } = req.body;

      const resultat = await coiffeurRequestService.traiterDemande(+id, approuvee, motif);

      res.json({ message: 'Demande traitée', data: resultat });
    } catch (err: any) {
      res.status(400).json({ erreur: err.message });
    }
  }
}

export const coiffeurRequestController = new CoiffeurRequestController();
