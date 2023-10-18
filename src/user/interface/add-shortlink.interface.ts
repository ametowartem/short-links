import { UserEntity } from '../entity/user.entity';

export interface IAddShortlink {
  user: UserEntity;
  shortLink: string;
}
