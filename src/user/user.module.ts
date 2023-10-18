import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { CoreModule } from '../core/core.module';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CoreModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
