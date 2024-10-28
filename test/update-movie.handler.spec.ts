import { faker } from '@faker-js/faker';

import { UpdateMovieCommand } from '../src/application/commands/update-movie.command';
import { UpdateMovieHandler } from '../src/application/commands/update-movie.handler';

import { MovieRepository } from '../src/domain/movie-repository.interface';

import { Movie } from '../src/domain/movie';
describe('UpdateMovieHandler', () => {
  let handler: UpdateMovieHandler;
  let mockRepository: Partial<MovieRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    };
    handler = new UpdateMovieHandler(mockRepository as MovieRepository);
  });

  it('should update an existing movie', async () => {
    const command = new UpdateMovieCommand(
      '671f95aa1483d14ac3c9f012',
      'Updated Title',
      faker.person.fullName(),
      '1999-05-19',
    );
    const existingMovie = Movie.create(
      faker.person.fullName(),
      1,
      'new_movie_title',
      '1999-05-19',
      faker.lorem.lines(),
    );

    mockRepository.findById = jest.fn().mockResolvedValue(existingMovie);

    await handler.handle(command);

    expect(mockRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Updated Title' }),
    );
  });
});
