import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    UsersService,
    ...usersProviders
  ],
  exports: [UsersService]
})
export class UsersModule {}
