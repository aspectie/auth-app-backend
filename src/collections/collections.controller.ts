import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @Get()
  async findAll(): Promise<Collection[]> {
    return this.collectionsService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Collection> {
    return this.collectionsService.remove(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return await this.collectionsService.update(id, updateCollectionDto);
  }
}
