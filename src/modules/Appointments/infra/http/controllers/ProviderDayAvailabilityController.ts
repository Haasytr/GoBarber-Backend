import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvailabilityService from '@modules/Appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityService {
  public async index(req: Request, res: Response): Promise<Response> {
    const {provider_id} = req.params
    const { day, year, month } = req.query

    console.log(provider_id)

    const listProviderDayAvailabilityService = container.resolve(ListProviderDayAvailabilityService)

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(availability);
  }
}
