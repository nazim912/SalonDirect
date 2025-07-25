import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class Service extends Model {
  declare id: CreationOptional<number>;
  declare salonId: number;
  declare name: string;
  declare price: number;
  declare durationMinutes: number;
}

Service.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    salonId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    durationMinutes: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: false,
  }
);

export default Service;