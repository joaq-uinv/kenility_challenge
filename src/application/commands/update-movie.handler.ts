import { Inject, Injectable, BadRequestException } from '@nestjs/common';

import { MovieRepository } from '../../domain/movie-repository.interface';

import { UpdateMovieCommand } from './update-movie.command';

@Injectable()
export class UpdateMovieHandler {
  constructor(
    @Inject('MovieRepository')
    private repository: MovieRepository,
  ) {}

  public async handle(command: UpdateMovieCommand): Promise<void> {
    let movie = await this.repository.findById(command.id);

    if (!movie) {
      throw new BadRequestException(
        `movie with id: ${command.id} does not exist`,
      );
    }

    movie = movie.update({
      title: command.title,
      director: command.director,
      releaseDate: command.releaseDate,
    });

    await this.repository.save(movie);
  }
}
