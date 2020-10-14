import AppError from '@shared/errors/appError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointments from './ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointments;
let fakeCacheProvider: FakeCacheProvider


describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointments(
      fakeAppointmentsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment_1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_02',
      date: new Date(2020, 4, 21, 14, 0, 0),
    });

    const appointment_2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user_02',
      date: new Date(2020, 4, 21, 15, 0, 0),
    });


    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 21,
    });

    await expect(appointments).toEqual([
     appointment_1,
     appointment_2,
    ]);
  });
});
