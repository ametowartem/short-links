import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { bcryptConstant } from '../auth/constants';
import * as bcrypt from 'bcrypt';
import { CreateUserInterface } from './create-user.interface';

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

  async registry(UserDto: CreateUserInterface) {
    const hash = await bcrypt.hash(UserDto.password, bcryptConstant.saltRounds);
    const user = new UserEntity(UserDto.username, hash);

    try {
      await this.add(user);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('User already exists');
      }

      throw new InternalServerErrorException();
    }
  }
}
