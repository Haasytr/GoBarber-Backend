import FakeUserRepository  from '@modules/Users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'


let fakeUsersRepository: FakeUserRepository
let listProvidersService: ListProvidersService
let fakeCacheProvider: FakeCacheProvider


describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider()

    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  })
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: "jonhdoe@example.com",
      password: "123456",
    })

    const user2 = await fakeUsersRepository.create({
      name: 'Jonh Tre',
      email: "jonhtre@example.com",
      password: "123456",
    })

    const logged_user = await fakeUsersRepository.create({
      name: 'loggedUser',
      email: "test@example.com",
      password: "123456",
    })

    const providers = await listProvidersService.execute({
      user_id: logged_user.id
    })

    expect(providers).toEqual([
      user1,
      user2
    ])
  });
});
