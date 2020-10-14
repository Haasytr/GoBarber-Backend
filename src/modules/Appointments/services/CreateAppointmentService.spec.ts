import AppError from '@shared/errors/appError'

import FakeNotificationsRepository from '@modules/Notifications/infra/typeorm/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentRepository  from '../repositories/fakes/FakeAppointmentRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService
let fakeCacheProvider: FakeCacheProvider

describe('CreateAppointment', () => {
  beforeEach(() => {
   fakeAppointmentsRepository = new FakeAppointmentRepository();
   fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '212312512',
      user_id: '12313'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('212312512')
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date()

    createAppointment.execute({
      date: appointmentDate,
      provider_id: '212312512',
      user_id: '123123'
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '212312512',
        user_id: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '123123',
        user_id: '1231223',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '123123',
        user_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: '123123',
        user_id: '1231232131',
      })
      ).rejects.toBeInstanceOf(AppError)
      await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: '123123',
        user_id: '1231232131',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})





