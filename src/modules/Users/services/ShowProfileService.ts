import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/appError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

	public async execute({ user_id}: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new AppError('user not founded', 400)
    }

    return user
	}
}

export default ShowProfileService;
