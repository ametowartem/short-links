import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserInterface } from './create-user.interface';
import { ConfigService } from '../core/service/config.service';
import { IAddShortlink } from './interface/add-shortlink.interface';

@Injectable()
export class UserService {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;
  constructor(private readonly configService: ConfigService) {}

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

  async addShortLink(dto: IAddShortlink): Promise<void> {
    await this.userRepository.update(
      { uuid: dto.user.uuid },
      {
        shortLinks: dto.user.shortLinks
          ? dto.shortLink.concat(',', dto.user.shortLinks)
          : dto.shortLink,
      },
    );
  }

  async addAvatar(dto): Promise<void> {
    await this.userRepository.update(
      { uuid: dto.user.uuid },
      {
        avatarPath: dto.avatarPath,
      },
    );
  }

  async registry(UserDto: CreateUserInterface) {
    const hash = await bcrypt.hash(
      UserDto.password,
      this.configService.saltRounds,
    );
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
