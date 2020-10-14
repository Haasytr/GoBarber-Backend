import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore , getHours, format} from 'date-fns';

import AppError from '@shared/errors/appError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/Notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'


interface Request {
	provider_id: string;
  date: Date;
  user_id: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}
	public async execute({ date, provider_id , user_id}: Request): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    if(isBefore(appointmentDate, Date.now())) {
      throw new AppError("you can't create an appointment in a past date", 400)
    }
		const findAppointInSameDate = await this.appointmentRepository.findByDate(appointmentDate, provider_id);

		if (findAppointInSameDate) {
			throw new AppError('this appointment is already booked', 400);
    }

    if(user_id == provider_id) {
      throw new AppError("you can't create an appointment with yourself", 400);

    }

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("you can't create an appointments between 8am and 5pm", 400);
    }

		const appointment = await this.appointmentRepository.create({
      provider_id,
      user_id,
			date: appointmentDate,
    });

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormated}`
    })

    await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`)
		return appointment;
	}
}

export default CreateAppointmentService;
