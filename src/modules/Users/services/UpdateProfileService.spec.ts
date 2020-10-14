import AppError from '@shared/errors/appError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository  from '../repositories/fakes/FakeUsersRepository';
import UpdateProfile from './UpdateProfileService';

let fakeUsersRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let updateUserAvatar: UpdateProfile

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserAvatar = new UpdateProfile(
      fakeUsersRepository,
      fakeHashProvider
    );
  })
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: "jonhdoe@example.com",
      password: "123456",
    })

    const updatedUser = await updateUserAvatar.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@email.com',
    })

    expect(updatedUser.name).toBe('Jonh Trê')
    expect(updatedUser.email).toBe('jonhtre@email.com')
  });

  it('should not be able to update an inexisting profile', async () => {
    expect(updateUserAvatar.execute({
      user_id: '1',
      name: 'test',
      email: 'test@exemple.com'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to change the email to another user email', async () => {

    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: "jonhdoe@example.com",
      password: "123456",
    })

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: "teste@example.com",
      password: "123456",
    })



    await expect(updateUserAvatar.execute({
      user_id: user.id,
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: "jonhdoe@example.com",
      password: "123456",
    })

    const updatedUser = await updateUserAvatar.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@email.com',
      password: '123123',
      old_password: '123456'
    })

    expect(updatedUser.password).toBe('123123')
  });

  it('should not  be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: "jonhdoe@example.com",
      password: "123456",
    })


    await expect(updateUserAvatar.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@email.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not  be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: "jonhdoe@example.com",
      password: "123456",
    })


    await expect(updateUserAvatar.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@email.com',
      old_password: 'wop',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError)
  });
});
