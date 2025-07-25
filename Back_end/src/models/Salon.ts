import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class Salon extends Model {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare city: string;
  declare lat: number;
  declare lng: number;
  declare description: string;
  declare ownerId: number;
}

Salon.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    lat: { type: DataTypes.FLOAT, allowNull: false },
    lng: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Salon',
    tableName: 'salons',
    timestamps: false,
  }
);

export default Salon;