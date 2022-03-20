import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  identityNumber: string;

  @ApiProperty()
  @IsArray()
  roles: string[];
}
