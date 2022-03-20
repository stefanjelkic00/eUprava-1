import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsernameInternal(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async verifyToken<S extends Record<string, unknown>>(token: string) {
    return this.jwtService.verify<S>(token);
  }

  async jwt(user: User) {
    const payload = {
      username: user.username,
      sub: user._id,
      roles: user.roles,
      identityNumber: user.identityNumber,
    };
    return this.jwtService.sign(payload);
  }

  async findUserByUsername(username: string) {
    const retVal = await this.userService.findByUsernameInternal(username);
    retVal.password = undefined;
    return retVal;
  }
}
