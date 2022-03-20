import { IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UserCreateDto {
  @IsNotEmpty()
  @Type(() => String)
  username: string;

  @IsNotEmpty()
  @Type(() => String)
  firstName: string;

  @IsNotEmpty()
  @Type(() => String)
  lastName: string;

  @IsNotEmpty()
  @Type(() => String)
  password: string;

  @IsNotEmpty()
  @Type(() => String)
  identityNumber: string;

  @IsArray()
  roles: string[];
}
