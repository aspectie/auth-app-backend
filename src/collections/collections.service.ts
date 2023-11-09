import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Collection } from './schemas/collection.schema';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

import { COLLECTION_MODEL } from 'src/constants';

@Injectable()
export class CollectionsService {
  constructor(@Inject(COLLECTION_MODEL) private readonly collectionModel: Model<Collection>) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    return await this.collectionModel.create(createCollectionDto);
  }

  async findAll(): Promise<Collection[]> {
    return this.collectionModel.find().exec();
  }

  async remove(id: string) {
    const deletedCollection = await this.collectionModel
      .findByIdAndRemove({ _id: id })
      .exec();

    return deletedCollection;
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto) {
    const updatedCollection = await this.collectionModel
      .findByIdAndUpdate({ _id: id }, updateCollectionDto, { new: true })
      .exec();

    return updatedCollection;
  }
}
