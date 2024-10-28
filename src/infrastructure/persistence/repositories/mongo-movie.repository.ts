import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

import { Collection, ObjectId } from 'mongodb';

import { Movie } from '../../../domain/movie';
import { MovieRepository } from '../../../domain/movie-repository.interface';

export class MongoMovieRepository implements MovieRepository {
  private db: Collection;

  constructor(@InjectConnection() private connection: Connection) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.db = this.connection.db.collection('movies');
  }

  async save(movie: any): Promise<void> {
    await this.db.updateOne(
      movie._id
        ? {
            _id: movie._id,
          }
        : { title: movie.title },
      {
        $set: {
          ...movie,
        },
      },
      {
        upsert: true,
      },
    );
  }

  async findAll(criteria: any): Promise<any> {
    let movies = this.db
      .find(criteria.filters)
      .skip(criteria.offset)
      .limit(criteria.limit);

    movies = (await movies.toArray()) as any;

    return movies;
  }

  async findById(id: string): Promise<Movie> {
    const primitives = await this.db.findOne({
      _id: new ObjectId(id),
    });

    if (!primitives) {
      return null;
    }

    return Movie.fromPrimitives(primitives);
  }

  async findByTitle(title: string): Promise<Movie> {
    const primitives = await this.db.findOne({
      title,
    });

    if (!primitives) {
      return null;
    }

    return Movie.fromPrimitives(primitives);
  }
}
