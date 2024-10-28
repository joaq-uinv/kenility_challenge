import { MovieSyncService } from '../src/infrastructure/services/sync-movie.service';
import { MovieRepository } from '../src/domain/movie-repository.interface';

describe('SyncMoviesHandler', () => {
  let handler: MovieSyncService;
  let mockRepository: Partial<MovieRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findByTitle: jest.fn(),
    };

    handler = new MovieSyncService(mockRepository as MovieRepository);
  });

  it('should sync movies from external API', async () => {
    await handler.syncMovies();

    expect(mockRepository.save).toHaveBeenCalled();
  }, 999999);
});
