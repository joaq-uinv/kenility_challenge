import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateMovieRequest {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  episodeId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  openingCrawl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  director: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  releaseDate: string;
}
