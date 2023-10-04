import { UserEntity } from '../../user/user.entity';

export interface IAddShortlink {
  user: UserEntity;
  shortLink: string;
}
