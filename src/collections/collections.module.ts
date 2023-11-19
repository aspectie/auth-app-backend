import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DatabaseModule } from 'src/database/database.module';
import { AwsS3Module } from 'src/aws-s3/s3.module';

import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';

import { collectionsProviders } from './collections.provider';
import { categoriesProviders } from 'src/categories/categories.provider';
import { usersProviders } from 'src/users/users.provider';

@Module({
  imports: [DatabaseModule, AwsS3Module],
  controllers: [CollectionsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    CollectionsService,
    ...collectionsProviders,
    ...categoriesProviders,
    ...usersProviders
  ],
  exports: [CollectionsService]
})
export class CollectionsModule {}
