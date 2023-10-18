import { Repository, DataSource } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async findOneByUuid(userUuid: number): Promise<UserEntity | undefined> {
    return this.findOne({ where: { uuid: userUuid } });
  }
  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.findOne({ where: { username } });
  }
}
