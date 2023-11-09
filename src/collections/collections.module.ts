import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DatabaseModule } from 'src/database/database.module';

import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { collectionsProviders } from './collections.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CollectionsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    CollectionsService,
    ...collectionsProviders
  ],
  exports: [CollectionsService]
})
export class CollectionsModule {}
