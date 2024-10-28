import { faker } from '@faker-js/faker';

import { CreateMovieCommand } from '../src/application/commands/create-movie.command';
import { CreateMovieHandler } from '../src/application/commands/create-movie.handler';

import { MovieRepository } from '../src/domain/movie-repository.interface';

describe('CreateMovieHandler', () => {
  let handler: CreateMovieHandler;
  let mockRepository: Partial<MovieRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findByTitle: jest.fn(),
    };
    handler = new CreateMovieHandler(mockRepository as MovieRepository);
  });

  it('should create a new movie', async () => {
    const command = new CreateMovieCommand(
      faker.person.fullName(),
      1,
      'new_movie_title',
      '1999-05-19',
      faker.lorem.lines(),
    );

    mockRepository.findByTitle = jest.fn().mockResolvedValue(null);

    await handler.handle(command);

    expect(mockRepository.save).toHaveBeenCalled();
  });
});
