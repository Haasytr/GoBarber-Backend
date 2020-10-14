import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/Users/infra/http/middlewares/ensureAuthentication';
import ProviderMonthAvailability from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailability from '../controllers/ProviderDayAvailabilityController';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailability = new ProviderDayAvailability();
const providerMonthAvailability = new ProviderMonthAvailability();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/' , providersController.index);
providersRouter.get('/:provider_id/month-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  }
}) , providerMonthAvailability.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvailability.index);

export default providersRouter;
