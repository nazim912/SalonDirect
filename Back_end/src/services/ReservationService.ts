import Reservation from '../models/Reservation';
import BaseService from './BaseService';

export class ReservationService extends BaseService<Reservation> {
  async createReservation(data: {
    clientId: number;
    salonId: number;
    serviceId: number;
    datetime: Date;
  }) {
    const existing = await Reservation.findOne({
      where: {
        clientId: data.clientId,
        salonId: data.salonId,
        serviceId: data.serviceId,
        datetime: data.datetime,
      },
    });

    if (existing) throw new Error('Vous avez déjà réservé ce service à cette date.');

    return await Reservation.create(data);
  }

  async getClientReservations(clientId: number) {
    return await Reservation.findAll({ where: { clientId } });
  }

  async cancelReservation(reservationId: number, clientId: number) {
    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) throw new Error('Réservation introuvable');
    if (reservation.clientId !== clientId) throw new Error("Vous ne pouvez pas annuler cette réservation.");
    reservation.status = 'cancelled';
    return await reservation.save();
  }

  async getReservationsBySalon(salonId: number) {
    return await Reservation.findAll({ where: { salonId } });
  }
}

export const reservationService = new ReservationService(Reservation);

