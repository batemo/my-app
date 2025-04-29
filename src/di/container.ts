import { container } from 'tsyringe';
import { IUserRepository, UserRepository } from '../repositories/user.repository';
import { IUserService, UserService } from '../services/user.service';

container.register<IUserRepository>('UserRepository', { useClass: UserRepository });
container.register<IUserService>('UserService', { useClass: UserService });

export { container }; 