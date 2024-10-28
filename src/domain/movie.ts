export class Movie {
  private _id: any;
  private title: string;
  private episodeId: number;
  private openingCrawl: string;
  private director: string;
  private releaseDate: string;

  private created_at: Date;
  private updated_at: Date;
  private deleted_at: Date;

  static create(
    title: string,
    episodeId: number,
    openingCrawl: string,
    director: string,
    releaseDate: string,
  ): Movie {
    const movie = new Movie();

    movie.title = title;
    movie.episodeId = episodeId;
    movie.openingCrawl = openingCrawl;
    movie.director = director;
    movie.releaseDate = releaseDate;

    movie.created_at = new Date();
    movie.updated_at = new Date();
    movie.deleted_at = null;

    return movie;
  }

  static fromPrimitives(primitives: any): Movie {
    const movie = new Movie();

    movie._id = primitives._id;
    movie.title = primitives.title;
    movie.episodeId = primitives.episodeId;
    movie.openingCrawl = primitives.openingCrawl;
    movie.director = primitives.director;
    movie.releaseDate = primitives.releaseDate;

    movie.created_at = new Date(primitives.created_at);
    movie.updated_at = new Date(primitives.updated_at);
    movie.deleted_at = new Date(primitives.deleted_at);

    return movie;
  }

  toPrimitives() {
    return {
      _id: this._id,
      title: this.title,
      episodeId: this.episodeId,
      openingCrawl: this.openingCrawl,
      director: this.director,
      releaseDate: this.releaseDate,

      created_at: this.created_at.getTime(),
      updated_at: this.updated_at.getTime(),
      deleted_at: this.deleted_at?.getTime(),
    };
  }

  getId() {
    return this._id;
  }

  getTitle() {
    return this.title;
  }

  getEpisodeId() {
    return this.episodeId;
  }

  getOpeningCrawl() {
    return this.openingCrawl;
  }

  getDirector() {
    return this.director;
  }

  getReleaseDate() {
    return this.releaseDate;
  }

  update(updatedProperties: any) {
    Object.keys(updatedProperties).forEach((key) => {
      // Check if the property exists in props
      if (
        key in this &&
        updatedProperties[key] !== null &&
        updatedProperties[key] !== undefined
      ) {
        this[key] = updatedProperties[key];
      }
    });

    this.updated_at = new Date();

    return this.toPrimitives();
  }

  delete() {
    this.deleted_at = new Date();
  }
}
