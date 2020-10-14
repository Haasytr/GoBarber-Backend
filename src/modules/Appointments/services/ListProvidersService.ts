import { inject, injectable } from 'tsyringe';

import User from 'modules/Users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import { classToClass } from 'class-transformer';

interface IRequest {
	user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,


    @inject('CacheProvider')
    private CacheProvider: ICacheProvider
  ) {}

	public async execute({ user_id}: IRequest): Promise<User[]> {
    let users = await this.CacheProvider.recover<User[]>(`providers-list:${user_id}`)

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        expect_user_id: user_id,
      });

      await this.CacheProvider.save(`providers-list:${user_id}`, classToClass(users))
    }
    return users;
	}
}

export default ListProvidersService;
