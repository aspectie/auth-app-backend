import { Connection } from 'mongoose';

import { DATABASE_CONNECTION, CUSTOM_FIELD_MODEL, CUSTOM_FIELD_STATE_MODEL, CUSTOM_FIELD_VALUE_MODEL, CUSTOM_FIELD_NAME_MODEL } from 'src/constants';

import { CustomFieldSchema } from './schemas/customField.schema';
import { CustomFieldNameSchema } from './schemas/customFieldName.schema';
import { CustomFieldStateSchema } from './schemas/customFieldState.schema';
import { CustomFieldValueSchema } from './schemas/customFieldValue.schema';

export const customFieldsProviders = [
  {
    provide: CUSTOM_FIELD_MODEL,
    useFactory: (connection: Connection) => connection.model('CustomField', CustomFieldSchema),
    inject: [DATABASE_CONNECTION]
  }, {
    provide: CUSTOM_FIELD_NAME_MODEL,
    useFactory: (connection: Connection) => connection.model('CustomFieldName', CustomFieldNameSchema),
    inject: [DATABASE_CONNECTION]
  }, {
    provide: CUSTOM_FIELD_STATE_MODEL,
    useFactory: (connection: Connection) => connection.model('CustomFieldState', CustomFieldStateSchema),
    inject: [DATABASE_CONNECTION]
  }, {
    provide: CUSTOM_FIELD_VALUE_MODEL,
    useFactory: (connection: Connection) => connection.model('CustomFieldValue', CustomFieldValueSchema),
    inject: [DATABASE_CONNECTION]
  }
];