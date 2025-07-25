import { Model, DataTypes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class Review extends Model {
  declare id: CreationOptional<number>;
  declare salonId: number;
  declare userId: number;
  declare rating: number;
  declare comment: string;
  declare createdAt: CreationOptional<Date>;
}

Review.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    salonId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: false,
  }
);

export default Review;