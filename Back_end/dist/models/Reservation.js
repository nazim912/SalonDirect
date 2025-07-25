"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Reservation extends sequelize_1.Model {
}
Reservation.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clientId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    salonId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    serviceId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    datetime: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    status: {
        type: sequelize_1.DataTypes.ENUM('booked', 'cancelled', 'completed'),
        defaultValue: 'booked',
    },
}, {
    sequelize: database_1.default,
    modelName: 'Reservation',
    tableName: 'reservations',
    timestamps: false,
});
exports.default = Reservation;
