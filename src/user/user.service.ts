import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  findOneByUuid(uuid: number): Promise<UserEntity> {
    return this.userRepository.findOneByUuid(uuid);
  }
  findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOneByUsername(username);
  }
  async remove(uuid: number): Promise<void> {
    await this.userRepository.delete(uuid);
  }
  async add(user: UserEntity): Promise<void> {
    await this.userRepository.insert(user);
  }
}
