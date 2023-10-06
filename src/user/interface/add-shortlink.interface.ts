import { UserEntity } from '../user.entity';

export interface IAddShortlink {
  user: UserEntity;
  shortLink: string;
}
