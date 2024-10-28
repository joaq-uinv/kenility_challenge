import { faker } from '@faker-js/faker';

import { FindMovieHandler } from '../src/application/commands/find-movie.handler';
import { MovieRepository } from '../src/domain/movie-repository.interface';
import { Movie } from '../src/domain/movie';

describe('FindMovieHandler', () => {
  let handler: FindMovieHandler;
  let mockRepository: Partial<MovieRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
    };
    handler = new FindMovieHandler(mockRepository as MovieRepository);
  });

  //TODO: fix this
  it('should return a movie by id', async () => {
    const movie = Movie.create(
      faker.person.fullName(),
      1,
      'new_movie_title',
      '1999-05-19',
      faker.lorem.lines(),
    );

    mockRepository.findAll = jest.fn().mockResolvedValue(movie);

    const result = await handler.handle(movie.getId());

    expect(result).toEqual(movie);
  });
});
