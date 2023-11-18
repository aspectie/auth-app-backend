import { Inject, Injectable } from '@nestjs/common';
import { Item } from './schemas/item.schema';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ITEM_MODEL } from 'src/constants';
import { OnEvent } from '@nestjs/event-emitter';
import { Collection } from 'src/collections/schemas/collection.schema';

@Injectable()
export class ItemsService {
  constructor(@Inject(ITEM_MODEL) private readonly itemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemModel.create(createItemDto);
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel
      .find()
      .populate('_collection')
      .exec();
  }

  async remove(id: string) {
    const deletedItem = await this.itemModel
      .findByIdAndRemove({ _id: id })
      .exec();

    return deletedItem;
  }

  @OnEvent('collections.removed')
  async removeByCollections(collections: Collection[]): Promise<any> {
    const ids = collections.map((collection) => {
      return collection._id
    })
    const deletedItems = await this.itemModel
      .deleteMany({ _collection: { $in: ids } })
      .exec();

    return deletedItems;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const updatedItem = await this.itemModel
      .findByIdAndUpdate({ _id: id }, updateItemDto, { new: true })
      .exec();

    return updatedItem;
  }
}
