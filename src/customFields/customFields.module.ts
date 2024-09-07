import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { DatabaseModule } from 'src/database/database.module';

import { CustomFieldsController } from './customFields.controller';
import { customFieldsProviders } from './customFields.provider';
import { CustomFieldsService } from './customFields.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomFieldsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    CustomFieldsService,
    ...customFieldsProviders
  ],
  exports: [CustomFieldsService]
})
export class CustomFieldsModule {}
