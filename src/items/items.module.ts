import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DatabaseModule } from 'src/database/database.module';

import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { itemsProviders } from './items.provider';
import { collectionsProviders } from 'src/collections/collections.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    ItemsService,
    ...itemsProviders,
    ...collectionsProviders
  ],
  exports: [ItemsService]
})
export class ItemsModule {}
