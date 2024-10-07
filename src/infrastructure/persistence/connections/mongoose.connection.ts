import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

import { config } from 'dotenv';

config();

export class MongooseConnection {
  static async create() {
    let uri = process.env.MONGO_URI;

    if (!uri.startsWith('mongodb://')) {
      uri = `mongodb://${uri}`;
    }

    let baseConfig: MongooseModuleFactoryOptions = {};

    baseConfig = {
      uri,
      auth: {
        username: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
      },
      maxIdleTimeMS: 60000,
      maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE) || 15,
      minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE) || 5,
      maxConnecting: Number(process.env.MONGO_MAX_CONNECTIONS) || 20,
      dbName: process.env.MONGO_DB_NAME,
      connectTimeoutMS: 3000,
      retryAttempts: 1,
      retryDelay: 100,
      ...baseConfig,
    };

    Logger.log(
      JSON.stringify(
        {
          ...baseConfig,
          auth: {
            ...baseConfig.auth,
            password: `${baseConfig.auth.password ? 'existe' : 'no existe'}`,
          },
        },
        null,
        2,
      ),
    );

    return baseConfig;
  }
}
