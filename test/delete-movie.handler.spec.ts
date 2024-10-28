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

  //TODO: fix this
  it('should delete a movie', async () => {
    const existingMovie = Movie.create(
      faker.person.fullName(),
      1,
      'new_movie_title',
      '1999-05-19',
      faker.lorem.lines(),
    );

    const command = new DeleteMovieCommand(existingMovie.getId());

    await handler.handle(command);

    expect(mockRepository.save).toHaveBeenCalledWith(existingMovie.getId());
  });
});
