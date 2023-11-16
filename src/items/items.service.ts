import { Inject, Injectable } from '@nestjs/common';
import { Item } from './schemas/item.schema';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ITEM_MODEL } from 'src/constants';
import { OnEvent } from '@nestjs/event-emitter';

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

  @OnEvent('collection.removed')
  async removeByCollectionId(id: string): Promise<any>  {
    const deletedItems = await this.itemModel
      .deleteMany({ _collection: id })
      .exec();

    return deletedItems;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const updatedItem = await this.itemModel
      .findByIdAndUpdate({ _id: id }, updateItemDto, { new: true })
      .exec();

    return updatedItem;
  }

  @OnEvent('collection.updated')
  async updateByCollectionId(id: string): Promise<any>  {
    //TODO: mapping fields

    // const deletedItems = await this.itemModel
    //   .updateMany({ _collection: id })
    //   .exec();

    // return deletedItems;
  }
}
