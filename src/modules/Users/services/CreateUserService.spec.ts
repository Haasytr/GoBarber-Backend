import AppError from '@shared/errors/appError'

import FakeUserRepository  from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'


let fakeUsersRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let cacheProvider: FakeCacheProvider

describe('CreateUser', () => {
  it('should be able to create a new appointment', async () => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider()
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      cacheProvider
    );

    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: "jonhdoe@example.com",
      password: "123456",
    })

    expect(user).toHaveProperty('id')
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
