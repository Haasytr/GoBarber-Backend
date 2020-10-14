import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../../config/upload';
import AppError from '@shared/errors/appError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
	user_id: string;
	avatarFilename: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

	public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('only authenticated users can change avatar', 401);
		}

		if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

		user.avatar = filename;

		await this.usersRepository.save(user);

		return user;
	}
}

export default UpdateAvatarService;