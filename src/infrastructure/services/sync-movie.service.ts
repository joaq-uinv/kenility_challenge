import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import axios from 'axios';

import { MovieRepository } from '../../domain/movie-repository.interface';
import { Movie } from '../../domain/movie';

@Injectable()
export class MovieSyncService {
  constructor(
    @Inject('MovieRepository')
    private repository: MovieRepository,
  ) {}

  async syncMovies(): Promise<void> {
    const { data } = await axios.get('https://swapi.dev/api/films/');

    const movies = data.results;

    for (const movieData of movies) {
      const existingMovie = await this.repository.findByTitle(movieData.title);

      if (!existingMovie) {
        const movie = Movie.create(
          movieData.title,
          movieData.episode_id,
          movieData.opening_crawl,
          movieData.director,
          movieData.release_date,
        );

        await this.repository.save(movie);
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    this.syncMovies();
  }
}
