import { Inject, Injectable } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { CATEGORY_MODEL } from 'src/constants';

@Injectable()
export class CategoriesService {
  constructor(@Inject(CATEGORY_MODEL) private readonly categoryModel: Model<Category>) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel
      .find()
      .exec();
  }
}
