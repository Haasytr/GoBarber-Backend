import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/Users/dtos/ICreateUserDto';
import IFindAllProvidersDto from '@modules/Users/dtos/IFindAllProvidersDto';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findAllProviders({expect_user_id}: IFindAllProvidersDto): Promise<User[]> {
    let users = []

    if(expect_user_id) {
       users = await this.ormRepository.find({
        where: {
          id: Not(expect_user_id)
        }
      })
    } else{
      users = await this.ormRepository.find()
    }

    return users
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
