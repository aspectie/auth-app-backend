import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DatabaseModule } from 'src/database/database.module';

import { categoriesProviders } from './categories.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    ...categoriesProviders
  ],
})
export class CollectionsModule {}
