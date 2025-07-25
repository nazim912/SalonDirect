import User from './User';
import Salon from './Salon';
import Service from './Service';
import Reservation from './Reservation';
import Review from './Review';
import Message from './Message';
import sequelize from '../config/database';

User.hasMany(Salon, { foreignKey: 'ownerId' });
Salon.belongsTo(User, { foreignKey: 'ownerId' });

Salon.hasMany(Service, { foreignKey: 'salonId' });
Service.belongsTo(Salon, { foreignKey: 'salonId' });

Salon.hasMany(Reservation, { foreignKey: 'salonId' });
Reservation.belongsTo(Salon, { foreignKey: 'salonId' });

User.hasMany(Reservation, { foreignKey: 'clientId' });
Reservation.belongsTo(User, { foreignKey: 'clientId' });

Service.hasMany(Reservation, { foreignKey: 'serviceId' });
Reservation.belongsTo(Service, { foreignKey: 'serviceId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Salon.hasMany(Review, { foreignKey: 'salonId' });
Review.belongsTo(Salon, { foreignKey: 'salonId' });

Reservation.hasMany(Message, { foreignKey: 'reservationId' });
Message.belongsTo(Reservation, { foreignKey: 'reservationId' });

User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });

sequelize.sync({ alter: true })
  .then(() => console.log('✅ Modèles synchronisés avec la base de données'))
  .catch((err) => console.error('❌ Erreur de synchronisation des modèles :', err));

export {
  User,
  Salon,
  Service,
  Reservation,
  Review,
  Message
};