import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CoreModule } from '../core/core.module';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CoreModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
