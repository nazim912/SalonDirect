"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Review extends sequelize_1.Model {
}
Review.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    salonId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    rating: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    comment: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: database_1.default,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: false,
});
exports.default = Review;
