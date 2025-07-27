// models/AdminRequest.ts
import { Model, DataTypes, CreationOptional, ForeignKey } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class AdminRequest extends Model {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<User['id']>;
  declare statut: 'en_attente' | 'approuvée' | 'refusée';
  declare motif?: string;
}

AdminRequest.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    statut: {
      type: DataTypes.ENUM('en_attente', 'approuvée', 'refusée'),
      defaultValue: 'en_attente',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'AdminRequest',
    tableName: 'admin_requests',
    timestamps: true,
  }
);

export default AdminRequest;
