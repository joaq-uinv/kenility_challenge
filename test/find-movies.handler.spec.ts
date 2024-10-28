import { faker } from '@faker-js/faker';

import { FindMoviesQuery } from '../src/application/queries/find-movies.query';
import { FindMoviesHandler } from '../src/application/commands/find-movies.handler';
import { MovieRepository } from '../src/domain/movie-repository.interface';
import { Movie } from '../src/domain/movie';

describe('FindMoviesHandler', () => {
  let handler: FindMoviesHandler;
  let mockRepository: Partial<MovieRepository>;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
    };
    handler = new FindMoviesHandler(mockRepository as MovieRepository);
  });

  it('should return a list of movies', async () => {
    const movies = [
      Movie.create(
        faker.person.fullName(),
        1,
        'new_movie_title',
        '1999-05-19',
        faker.lorem.lines(),
      ),
      Movie.create(
        faker.person.fullName(),
        1,
        'new_movie_title',
        '1999-05-19',
        faker.lorem.lines(),
      ),
    ];
    mockRepository.findAll = jest.fn().mockResolvedValue(movies);

    const result = await handler.handle(new FindMoviesQuery({}, 1));

    expect(result).toEqual(movies);
  });
});
