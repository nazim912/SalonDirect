import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BaseService from './BaseService';

export class UserService extends BaseService<User> {
  async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async updateUserRole(userId: number, role: 'admin' | 'client') {
  const user = await this.findById(userId);
  if (!user) throw new Error('Utilisateur non trouvé');
  return user.update({ role });
  
}

  async createUser(data: { name: string; email: string; password: string; role: 'client' | 'admin' }) {
    const existing = await this.findByEmail(data.email);
    if (existing) throw new Error('Utilisateur déjà existant');
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
    });
    return user;
  }

  async authenticate(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new Error('Utilisateur non trouvé');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Mot de passe incorrect');
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    return { token, user };
  }
}

export const userService = new UserService(User);