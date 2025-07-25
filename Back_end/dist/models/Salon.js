"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Salon extends sequelize_1.Model {
}
Salon.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    address: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    city: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    lat: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    lng: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    ownerId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, {
    sequelize: database_1.default,
    modelName: 'Salon',
    tableName: 'salons',
    timestamps: false,
});
exports.default = Salon;
