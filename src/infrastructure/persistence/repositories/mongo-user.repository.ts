import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

import { Collection } from 'mongodb';

import { User } from '../../../domain/user';
import { UserRepository } from '../../../domain/user-repository.interface';

export class MongoUserRepository implements UserRepository {
  private db: Collection;

  constructor(@InjectConnection() private connection: Connection) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.db = this.connection.db.collection('users');
  }

  async save(user: User): Promise<void> {
    const primitives = user.toPrimitives();

    await this.db.updateOne(
      {
        name: primitives.name,
      },
      {
        $set: primitives,
      },
      {
        upsert: true,
      },
    );
  }

  async findAll(criteria: any): Promise<any> {
    let users = this.db
      .find(criteria.filters)
      .skip(criteria.offset)
      .limit(criteria.limit);

    users = (await users.toArray()) as any;

    return users;
  }

  async findByName(name: string): Promise<User> {
    const primitives = await this.db.findOne({
      name,
    });

    if (!primitives) {
      return null;
    }

    return User.fromPrimitives(primitives);
  }
}
