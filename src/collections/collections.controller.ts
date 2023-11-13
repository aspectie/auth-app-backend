import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { S3Service } from 'src/aws-s3/s3.service';
import { CollectionsService } from './collections.service';
import { Collection } from './schemas/collection.schema';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
@ApiTags('collections')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly eventEmitter: EventEmitter2,
    private readonly S3Service: S3Service
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        },
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        theme: {
          type: 'string'
        },
        user_id: {
          type: 'string'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file'))
  async createWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    const newCollection = await this.collectionsService.create(createCollectionDto);
    const filePath = await this.S3Service.uploadFile(file, String(newCollection._id));
    const collection = await this.collectionsService.update(newCollection._id, {
      image_url: filePath
    })

    return collection; 
  }

  @Get()
  async findAll(): Promise<Collection[]> {
    return this.collectionsService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Collection> {
    const collection = this.collectionsService.remove(id);
    
    this.eventEmitter.emit(
      'collection.removed',
      id
    );
    
    return collection;
  }
  
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        },
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        theme: {
          type: 'string'
        },
        user_id: {
          type: 'string'
        }
      }
    }
  })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateCollectionDto: UpdateCollectionDto
  ) {
    const filePath = await this.S3Service.uploadFile(file, id);
    updateCollectionDto.image_url = filePath

    return await this.collectionsService.update(id, updateCollectionDto);
  }
}
