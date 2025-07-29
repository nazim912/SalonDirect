import AdminRequest from '../models/AdminRequest';
import BaseService from './BaseService';
import { WhereOptions } from 'sequelize';

export class AdminRequestService extends BaseService<AdminRequest> {
  constructor() {
    super(AdminRequest);
  }

  async demander(userId: number) {
    const existante = await this.model.findOne({
      where: { userId, statut: 'en_attente' } as WhereOptions,
    });

    if (existante) throw new Error('Une demande est déjà en cours');

    return this.create({ userId });
  }

  async traiterDemande(id: number, approuvée: boolean, motif?: string) {
    const demande = await this.findById(id);
    if (!demande) throw new Error('Demande introuvable');

    demande.statut = approuvée ? 'approuvée' : 'refusée';
    demande.motif = motif;
    await demande.save();

    return demande;
  }
}

export const adminRequestService = new AdminRequestService();
