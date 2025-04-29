import { Router, Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { IUserService } from '../services/user.service';

@injectable()
export class UserController {
  constructor(
    @inject('UserService') private userService: IUserService
  ) {}

  registerRoutes(): Router {
    const router = Router();
    router.get('/', this.findAll.bind(this));
    router.post('/', this.create.bind(this));
    router.get('/:id', this.findById.bind(this));
    router.put('/:id', this.update.bind(this));
    router.delete('/:id', this.delete.bind(this));
    return router;
  }

  async findAll(req: Request, res: Response) {
    const users = await this.userService.findAll(req.query);
    res.json(users);
  }

  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body);
    res.status(201).json(user);
  }

  async findById(req: Request, res: Response) {
    const user = await this.userService.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }

  async update(req: Request, res: Response) {
    const user = await this.userService.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  }

  async delete(req: Request, res: Response) {
    const success = await this.userService.delete(req.params.id);
    if (!success) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();
  }
} 