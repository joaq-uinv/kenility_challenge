import { Inject, Injectable, BadRequestException } from '@nestjs/common';

import { CreateMovieCommand } from './create-movie.command';

import { Movie } from '../../domain/movie';

import { MovieRepository } from '../../domain/movie-repository.interface';

@Injectable()
export class CreateMovieHandler {
  constructor(
    @Inject('MovieRepository')
    private repository: MovieRepository,
  ) {}

  public async handle(command: CreateMovieCommand): Promise<void> {
    let movie = await this.repository.findByTitle(command.title);

    if (movie) {
      throw new BadRequestException(
        `movie with name: ${command.title} already exists`,
      );
    }

    movie = Movie.create(
      command.title,
      command.episodeId,
      command.openingCrawl,
      command.director,
      command.releaseDate,
    );

    await this.repository.save(movie);
  }
}
