import { Router } from 'express';

import AppointmentsRouter from '@modules/Appointments/infra/http/routes/appointments.routes';
import ProvidersRouter from '@modules/Appointments/infra/http/routes/providers.routes';
import UsersRouter from '@modules/Users/infra/http/routes/users.routes';
import SessionsRouter from '@modules/Users/infra/http/routes/session.routes';
import PasswordRouter from '@modules/Users/infra/http/routes/password.routes';
import ProfileRouter from '@modules/Users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', AppointmentsRouter);
routes.use('/users', UsersRouter);
routes.use('/session', SessionsRouter);
routes.use('/password', PasswordRouter);
routes.use('/profile', ProfileRouter);
routes.use('/providers', ProvidersRouter);

export default routes;
