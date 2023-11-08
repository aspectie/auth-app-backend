import { Connection } from 'mongoose';
import { ItemSchema } from './schemas/item.schema';
import { DATABASE_CONNECTION, ITEM_MODEL } from 'src/constants';

export const itemsProviders = [
  {
    provide: ITEM_MODEL,
    useFactory: (connection: Connection) => connection.model('Item', ItemSchema),
    inject: [DATABASE_CONNECTION]
  },
];