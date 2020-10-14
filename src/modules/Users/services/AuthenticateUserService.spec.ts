import AppError from '@shared/errors/appError'

import FakeUserRepository  from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let authenticateUser: AuthenticateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider()

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

  })

  it('it should be able to authenticate', async () => {

    const user = await fakeUsersRepository.create({
      name: 'jonh doe',
      email: 'jonhdoe@exemple.com',
      password: '12345'
    })

   const response = await authenticateUser.execute({
     email: 'jonhdoe@exemple.com',
     password: '12345'
   })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user);
  });

  it('it should not be able to authenticate with non-existent user', async () => {

    await expect(authenticateUser.execute({
      email: 'jonhdoe@exemple.com',
      password: '12345'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('it should not be able to authenticate with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'jonh doe',
      email: 'jonhdoe@exemple.com',
      password: '12345'
    })

    await expect(authenticateUser.execute({
      email: 'jonhdoe@exemple.com',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError)
  });
});

