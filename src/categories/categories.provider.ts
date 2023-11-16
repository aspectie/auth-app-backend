import { Connection } from 'mongoose';
import { CategorySchema } from './schemas/category.schema';
import { DATABASE_CONNECTION, CATEGORY_MODEL } from 'src/constants';

export const categoriesProviders = [
  {
    provide: CATEGORY_MODEL,
    useFactory: (connection: Connection) => connection.model('Category', CategorySchema),
    inject: [DATABASE_CONNECTION]
  },
];