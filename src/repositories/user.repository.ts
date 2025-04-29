import { injectable } from 'tsyringe';
import { UserModel } from '../models/user.model';
import { User, UserQuery, UserResult } from '../types/user.types';

export interface IUserRepository {
  create(user: User): Promise<UserResult>;
  findById(id: string): Promise<UserResult | null>;
  findAll(query?: UserQuery): Promise<UserResult[]>;
  update(id: string, update: Partial<User>): Promise<UserResult | null>;
  delete(id: string): Promise<boolean>;
}

@injectable()
export class UserRepository implements IUserRepository {
  async create(user: User): Promise<UserResult> {
    const created = await UserModel.create(user);
    const { passwordHash, ...result } = created.toObject();
    return result;
  }

  async findById(id: string): Promise<UserResult | null> {
    const user = await UserModel.findOne({ id }).lean();
    if (!user) return null;
    const { passwordHash, ...result } = user;
    return result;
  }

  async findAll(query: UserQuery = {}): Promise<UserResult[]> {
    const users = await UserModel.find(query).lean();
    return users.map(({ passwordHash, ...rest }) => rest);
  }

  async update(id: string, update: Partial<User>): Promise<UserResult | null> {
    const user = await UserModel.findOneAndUpdate({ id }, update, { new: true }).lean();
    if (!user) return null;
    const { passwordHash, ...result } = user;
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const res = await UserModel.deleteOne({ id });
    return res.deletedCount === 1;
  }
} 