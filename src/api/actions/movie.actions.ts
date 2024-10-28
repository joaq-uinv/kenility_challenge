import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { FindMoviesHandler } from '../../application/commands/find-movies.handler';
import { FindMoviesQuery } from '../../application/queries/find-movies.query';

import { FindMovieHandler } from '../../application/commands/find-movie.handler';

import { CreateMovieRequest } from '../../domain/contracts/create-movie.request';
import { CreateMovieCommand } from '../../application/commands/create-movie.command';
import { CreateMovieHandler } from '../../application/commands/create-movie.handler';

import { UpdateMovieRequest } from '../../domain/contracts/update-movie.request';
import { UpdateMovieCommand } from '../../application/commands/update-movie.command';
import { UpdateMovieHandler } from '../../application/commands/update-movie.handler';

import { DeleteMovieCommand } from '../../application/commands/delete-movie.command';
import { DeleteMovieHandler } from '../../application/commands/delete-movie.handler';

@ApiTags('movies')
@Controller({ path: '/movies', version: '1' })
export class MovieActions {
  constructor(
    private findMoviesHandler: FindMoviesHandler,
    private findMovieHandler: FindMovieHandler,
    private createMovieHandler: CreateMovieHandler,
    private updateMovieHandler: UpdateMovieHandler,
    private deleteMovieHandler: DeleteMovieHandler,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    schema: {
      example: {
        type: 'array',
        properties: {
          id: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          deleted_at: { type: 'string', format: 'date-time' },
          director: { type: 'string' },
          episodeId: { type: 'integer' },
          openingCrawl: { type: 'string' },
          releaseDate: { type: 'string', format: 'date' },
          title: { type: 'string' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  public async findAll(
    @Query('filters') filters: any,
    @Query('page') page = 1,
  ): Promise<any> {
    const query = new FindMoviesQuery(filters, Number(page));

    const movies = await this.findMoviesHandler.handle(query);

    return movies;
  }

  @Get('/:id')
  @ApiResponse({
    schema: {
      example: {
        id: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        deleted_at: { type: 'string', format: 'date-time' },
        director: { type: 'string' },
        episodeId: { type: 'integer' },
        openingCrawl: { type: 'string' },
        releaseDate: { type: 'string', format: 'date' },
        title: { type: 'string' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiBearerAuth()
  public async findById(@Param('id') id: string): Promise<any> {
    const movie = await this.findMovieHandler.handle(id);

    return movie;
  }

  @Post()
  @ApiBearerAuth()
  public async create(@Body() body: CreateMovieRequest): Promise<any> {
    const command = new CreateMovieCommand(
      body.title,
      body.episodeId,
      body.openingCrawl,
      body.director,
      body.releaseDate,
    );

    const res = await this.createMovieHandler.handle(command);

    return res;
  }

  @Put('/:id')
  @ApiBearerAuth()
  public async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateMovieRequest,
  ): Promise<any> {
    const command = new UpdateMovieCommand(
      id,
      body.title,
      body.director,
      body.releaseDate,
    );

    await this.updateMovieHandler.handle(command);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  public async deleteOne(@Param('id') id: string): Promise<void> {
    const command = new DeleteMovieCommand(id);

    await this.deleteMovieHandler.handle(command);
  }
}
