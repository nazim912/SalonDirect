import Salon from '../models/Salon';
import BaseService from './BaseService';

export class SalonService extends BaseService<Salon> {
  constructor() {
    super(Salon);
  }

  async updateSalon(id: number, userId: number, data: Partial<Salon>) {
    const salon = await this.findById(id);
    if (!salon) throw new Error('Salon introuvable');
    if (salon.ownerId !== userId) throw new Error("Vous n'êtes pas le propriétaire de ce salon");

    return await super.update(id, data);
  }

  async deleteSalon(id: number, userId: number) {
    const salon = await this.findById(id);
    if (!salon) throw new Error('Salon introuvable');
    if (salon.ownerId !== userId) throw new Error("Vous n'êtes pas le propriétaire de ce salon");

    return await super.delete(id);
  }
}

export const salonService = new SalonService();
