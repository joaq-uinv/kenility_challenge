import { Controller, Post } from '@nestjs/common';

import { MovieSyncService } from '../services/sync-movie.service';

@Controller({ path: '/movies', version: '1' })
export class MoviesSyncController {
  constructor(private readonly movieSyncService: MovieSyncService) {}

  @Post('/sync')
  async syncMovies() {
    await this.movieSyncService.syncMovies();

    return { message: 'Movies synchronized successfully' };
  }
}
