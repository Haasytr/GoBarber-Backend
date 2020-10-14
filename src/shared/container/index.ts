import { container } from 'tsyringe';

import mailConfig from '@config/mail'

import '@modules/Users/providers';
import './providers';

import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/Appointments/infra/typeorm/Repositories/AppointmentsRepository';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/Users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/Users/infra/typeorm/repositories/UserTokenRepository';

import INotificationsRepository from '@modules/Notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/Notifications/infra/typeorm/repositories/NotificationRepository';

import './providers/MailTemplateProvider'
import './providers/MailProvider'
import './providers/StorageProvider'
import './providers/CacheProvider';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);



