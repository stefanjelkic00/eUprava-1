import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async createUser(@Body() user: UserCreateDto) {
    await this.service.createUser(user);
  }

  @Get('find/username/:username')
  async findByUsername(@Param('username') username: string) {
    return await this.service.findByUsername(username);
  }

  @Get('find/id/:id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Get('find/identity_number/:identity_number')
  async findByIdentityNumber(@Param('identity_number') identityNumber: string) {
    return await this.service.findByIdentityNumber(identityNumber);
  }
}
