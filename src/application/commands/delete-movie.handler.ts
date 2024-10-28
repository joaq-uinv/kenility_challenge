import { Inject, NotFoundException } from '@nestjs/common';

import { MovieRepository } from '../../domain/movie-repository.interface';
import { DeleteMovieCommand } from './delete-movie.command';

export class DeleteMovieHandler {
  constructor(
    @Inject('MovieRepository')
    private repository: MovieRepository,
  ) {}

  public async handle(command: DeleteMovieCommand): Promise<void> {
    const movie = await this.repository.findById(command.id);

    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    movie.delete();

    await this.repository.save(movie);
  }
}
