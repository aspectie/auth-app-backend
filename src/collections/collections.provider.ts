import { Connection } from 'mongoose';
import { CollectionSchema } from './schemas/collection.schema';
import { DATABASE_CONNECTION, COLLECTION_MODEL } from 'src/constants';

export const collectionsProviders = [
  {
    provide: COLLECTION_MODEL,
    useFactory: (connection: Connection) => connection.model('Collection', CollectionSchema),
    inject: [DATABASE_CONNECTION]
  },
];