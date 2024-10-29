import { faker } from '@faker-js/faker';

import { DeleteMovieCommand } from '../src/application/commands/delete-movie.command';
import { DeleteMovieHandler } from '../src/application/commands/delete-movie.handler';
import { MovieRepository } from '../src/domain/movie-repository.interface';
import { Movie } from '../src/domain/movie';

describe('DeleteMovieHandler', () => {
  let handler: DeleteMovieHandler;
  let mockRepository: Partial<MovieRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByTitle: jest.fn(),
    };
    handler = new DeleteMovieHandler(mockRepository as MovieRepository);
  });

  it('should delete a movie', async () => {
    const movieId = faker.database.mongodbObjectId();

    const existingMovie = Movie.create(
      faker.lorem.words(),
      1,
      faker.lorem.paragraphs(),
      faker.person.fullName(),
      faker.date.anytime().toLocaleDateString(),
    );

    existingMovie['_id'] = movieId;

    const command = new DeleteMovieCommand(movieId);

    (mockRepository.findById as jest.Mock).mockResolvedValue(existingMovie);

    await handler.handle(command);

    expect(mockRepository.findById).toHaveBeenCalledWith(movieId);
    expect(mockRepository.save).toHaveBeenCalledWith(existingMovie);
  });
});
