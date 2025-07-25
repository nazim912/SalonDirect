import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class Reservation extends Model {
  declare id: CreationOptional<number>;
  declare clientId: number;
  declare salonId: number;
  declare serviceId: number;
  declare datetime: Date;
  declare status: 'booked' | 'cancelled' | 'completed';
}

Reservation.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clientId: { type: DataTypes.INTEGER, allowNull: false },
    salonId: { type: DataTypes.INTEGER, allowNull: false },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    datetime: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.ENUM('booked', 'cancelled', 'completed'),
      defaultValue: 'booked',
    },
  },
  {
    sequelize,
    modelName: 'Reservation',
    tableName: 'reservations',
    timestamps: false,
  }
);

export default Reservation;