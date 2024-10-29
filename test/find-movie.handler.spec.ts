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

  it('should return a movie by id', async () => {
    const movieId = faker.database.mongodbObjectId();

    const existingMovie = Movie.create(
      faker.lorem.words(),
      1,
      faker.lorem.paragraphs(),
      faker.person.fullName(),
      faker.date.anytime().toLocaleDateString(),
    );

    existingMovie['_id'] = movieId;

    (mockRepository.findById as jest.Mock).mockResolvedValue(existingMovie);

    const result = await handler.handle(movieId);

    expect(result.toPrimitives()).toEqual(existingMovie.toPrimitives());
  });
});
