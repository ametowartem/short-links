import { UserEntity } from '../entity/user.entity';

export interface IAddAvatar {
  user: UserEntity;
  avatarPath: string;
}