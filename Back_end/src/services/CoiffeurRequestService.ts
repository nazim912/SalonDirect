import CoiffeurRequest from '../models/CoiffeurRequest';
import BaseService from './BaseService';
import { WhereOptions } from 'sequelize';
import { userService } from './UserService';

export class CoiffeurRequestService extends BaseService<CoiffeurRequest> {
  constructor() {
    super(CoiffeurRequest);
  }

  async demander(userId: number, description?: string) {
    const existante = await this.model.findOne({
      where: { userId, statut: 'en_attente' } as WhereOptions,
    });

    if (existante) throw new Error('Une demande est déjà en attente');

    return this.create({ userId, description });
  }

  async traiterDemande(id: number, approuvee: boolean, motif?: string) {
    const demande = await this.findById(id);
    if (!demande) throw new Error('Demande introuvable');

    demande.statut = approuvee ? 'approuvée' : 'refusée';
    demande.motif = motif;
    await demande.save();

    if (approuvee) {
      await userService.updateUserRole(demande.userId, 'coiffeur');
    }

    return demande;
  }
}

export const coiffeurRequestService = new CoiffeurRequestService();
