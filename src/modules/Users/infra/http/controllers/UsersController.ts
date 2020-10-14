import { Request, Response } from 'express'
import { container } from 'tsyringe';
import CreateUser from '@modules/Users/services/CreateUserService';
import { classToClass } from 'class-transformer';


export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(CreateUser);

    const { name, email, password } = req.body

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.json(classToClass(user));
  }
}
