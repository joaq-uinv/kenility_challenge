import { Inject, forwardRef } from '@nestjs/common';

import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user-repository.interface';
import { FindUsersQuery } from '../queries/find-users.query';

export class FindUsersHandler {
  constructor(
    @Inject(forwardRef(() => 'UserRepository'))
    private repository: UserRepository,
  ) {}

  public async handle(query: FindUsersQuery): Promise<Array<User>> {
    let filters: any[] = [
      // {
      //   deleted_at: null,
      // },
    ];

    if (query.filters && Object.keys(query.filters).length) {
      const parsedFilters = this.parseNumbers(query.filters);

      filters = [...filters, parsedFilters];
    }

    filters = filters.reduce((acc, filter) => {
      return { ...acc, ...filter };
    }, {});

    const criteria = {
      filters,
      limit: 20,
      offset: query.page - 1,
    };

    const users = await this.repository.findAll(criteria);

    return users;
  }

  // Recursive function to parse numbers
  private parseNumbers(obj: any): any {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        // Recursively parse nested objects
        if (typeof value === 'object' && value !== null) {
          acc[key] = this.parseNumbers(value);

          // Convert numeric strings to numbers
        } else if (typeof value === 'string' && !isNaN(Number(value))) {
          acc[key] = Number(value);

          // Leave other values unchanged
        } else {
          acc[key] = value;
        }

        return acc;
      },
      {} as Record<string, any>,
    );
  }
}
