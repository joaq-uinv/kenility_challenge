import { Inject, forwardRef } from '@nestjs/common';

import { Movie } from '../../domain/movie';
import { MovieRepository } from '../../domain/movie-repository.interface';

export class FindMovieHandler {
  constructor(
    @Inject(forwardRef(() => 'MovieRepository'))
    private repository: MovieRepository,
  ) {}

  public async handle(id: string): Promise<Movie> {
    const movie = await this.repository.findById(id);

    return movie;
  }
}
