import { Inject, forwardRef } from '@nestjs/common';

import { Movie } from '../../domain/movie';
import { MovieRepository } from '../../domain/movie-repository.interface';
import { FindMoviesQuery } from '../queries/find-movies.query';

export class FindMoviesHandler {
  constructor(
    @Inject(forwardRef(() => 'MovieRepository'))
    private repository: MovieRepository,
  ) {}

  public async handle(query: FindMoviesQuery): Promise<Array<Movie>> {
    let filters: any[] = [
      {
        deleted_at: null, //valores falsies
      },
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
