import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload'

import { Exclude, Expose } from 'class-transformer'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() name: string;

  @Column() email: string;

  @Column() @Exclude() password: string;

  @Column() avatar: string;

  @CreateDateColumn() created_at: Date;

  @UpdateDateColumn() updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatar_url(): string | null {
    switch(uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`
      case 's3':
      return 'tristeza'
      default:
        return null;
    }
  }
}

export default User;