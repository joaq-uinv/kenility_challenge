import { Movie } from './movie';

export interface MovieRepository {
  findAll(criteria: any): Promise<Movie[]>;

  findById(id: string): Promise<any>;

  findByTitle(title: string): Promise<Movie>;

  save(movie: Movie): Promise<void>;
}
