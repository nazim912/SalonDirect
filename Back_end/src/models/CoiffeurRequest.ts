import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

export default class CoiffeurRequest extends Model {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare statut: 'en_attente' | 'approuvée' | 'refusée';
  declare motif?: string;
  declare description?: string;
}

CoiffeurRequest.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    statut: {
      type: DataTypes.ENUM('en_attente', 'approuvée', 'refusée'),
      defaultValue: 'en_attente',
    },
    motif: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT },
  },
  {
    sequelize,
    modelName: 'CoiffeurRequest',
    tableName: 'coiffeur_requests',
  }
);