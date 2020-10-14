import AppError from '@shared/errors/appError'

import FakeUserRepository  from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUserRepository
let showProfile: ShowProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(
      fakeUsersRepository,
    );
  })
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: "jonhdoe@example.com",
      password: "123456",
    })

    const profile = await showProfile.execute({
      user_id: user.id
    })

    expect(profile.name).toBe('Jonh Doe')
    expect(profile.email).toBe('jonhdoe@example.com')
  });

  it('should not be able to show an inexisting profile', async () => {
    expect(showProfile.execute({
      user_id: '1'
    })).rejects.toBeInstanceOf(AppError)
  });
});
