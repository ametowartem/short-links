import { UserEntity } from '../user.entity';

export interface IAddAvatar {
  user: UserEntity;
  avatarPath: string;
}