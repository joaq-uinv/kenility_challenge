import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ['admin', 'user'] })
  @IsEnum(['admin', 'user'])
  role: string;

  @ApiProperty()
  @IsString()
  password: string;
}
