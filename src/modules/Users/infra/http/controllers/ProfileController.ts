import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'

import UpdateProfileService from '@modules/Users/services/UpdateProfileService';
import ShowProfileService from '@modules/Users/services/ShowProfileService';

export default class UserAvatarController {

  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.execute({ user_id });


    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id
    const { email, old_password, name, password } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({ name,email, old_password, user_id, password });


    return res.json(classToClass(user));

  }
}
