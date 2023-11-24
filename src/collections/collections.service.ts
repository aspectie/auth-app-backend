import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Collection } from './schemas/collection.schema';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

import { COLLECTION_MODEL } from 'src/constants';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CollectionsService {
  constructor(
    @Inject(COLLECTION_MODEL) private readonly collectionModel: Model<Collection>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    return await this.collectionModel.create(createCollectionDto);
  }

  async findAll(): Promise<Collection[]> {
    return await this.collectionModel
      .find()
      .populate('theme', 'name')
      .populate('user', 'name')
      .exec();
  }

  async findById(id: string): Promise<Collection> {
    return this.collectionModel
      .findOne({ _id: id })
      .populate('theme', 'name')
      .populate('user', 'name')
      .exec();
  }

  async findByUserId(id: string): Promise<Collection[]> {
    return this.collectionModel
      .find({ user: id })
      .populate('theme', 'name')
      .exec();
  }

  async remove(id: string) {
    const deletedCollection = await this.collectionModel
      .findByIdAndRemove({ _id: id })
      .exec();

    this.eventEmitter.emit(
      'collection.removed',
      id
    );

    return deletedCollection;
  }

  @OnEvent('user.removed')
  async removeByUserId(id: string): Promise<any> {
    const collectionsToBeRemoved = await this.collectionModel
      .find({ user: id })
      .exec();

    const deletedCollections = await this.collectionModel
      .deleteMany({ user: id })
      .exec();  

    this.eventEmitter.emit(
      'collections.removed',
      collectionsToBeRemoved
    );    

    return collectionsToBeRemoved;
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto) {
    const updatedCollection = await this.collectionModel
      .findByIdAndUpdate({ _id: id }, updateCollectionDto, { new: true })
      .exec();

    this.eventEmitter.emit(
      'collection.updated',
      updateCollectionDto
    );

    return updatedCollection;
  }
}
