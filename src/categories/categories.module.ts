import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DatabaseModule } from 'src/database/database.module';

import { CategoriesController } from './categories.controller';
import { categoriesProviders } from './categories.provider';
import { CategoriesService } from './categories.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    CategoriesService,
    ...categoriesProviders
  ],
  exports: [CategoriesService]
})
export class CategoriesModule {}
