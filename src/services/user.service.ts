import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories/user.repository';
import { User, UserQuery, UserResult } from '../types/user.types';

export interface IUserService {
  create(user: User): Promise<UserResult>;
  findById(id: string): Promise<UserResult | null>;
  findAll(query?: UserQuery): Promise<UserResult[]>;
  update(id: string, update: Partial<User>): Promise<UserResult | null>;
  delete(id: string): Promise<boolean>;
}

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async create(user: User): Promise<UserResult> {
    // Add business logic here (e.g., hash password, validate, etc.)
    return this.userRepository.create(user);
  }

  async findById(id: string): Promise<UserResult | null> {
    return this.userRepository.findById(id);
  }

  async findAll(query?: UserQuery): Promise<UserResult[]> {
    return this.userRepository.findAll(query);
  }

  async update(id: string, update: Partial<User>): Promise<UserResult | null> {
    return this.userRepository.update(id, update);
  }

  async delete(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
} 