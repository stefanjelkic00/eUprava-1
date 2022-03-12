import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  async renderLogin(
    @Session() session,
    @Req() req: Request,
    @Res() res: Response,
    @Query() query,
  ) {
    try {
      await this.authService.verifyToken(session.user);
      const url = new URL(query.successUrl);
      url.searchParams.append('token', session.user);
      return res.redirect(url.toString());
    } catch (e) {
      session.destroy();
      return res.render('login.hbs', { hasError: query.hasError });
    }
  }

  @Get('logout')
  async logout(@Res() res: Response, @Query() query, @Session() session) {
    session.destroy();
    const { successUrl } = query;
    return res.redirect(successUrl);
  }

  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query,
    @Session() session,
  ) {
    const { successUrl } = query;
    if (!successUrl) {
      return res.json({ message: 'successUrl query parameter needed' });
    }
    const user = await this.authService.validateUser(
      req.body.username,
      req.body.password,
    );
    if (!user) {
      return res.redirect(`login?successUrl=${successUrl}&hasError=true`);
    }
    const url = new URL(successUrl);
    const jwt = await this.authService.jwt(user);
    session.user = jwt;
    url.searchParams.append('token', jwt);
    return res.redirect(url.toString());
  }

  @Get('check')
  async check(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session,
    @Query() query,
  ) {
    const { successUrl, failUrl } = query;
    if (!successUrl) {
      return { message: 'successUrl missing from URL params' };
    }
    if (!failUrl) {
      return { message: 'failUrl missing from URL params' };
    }
    const user: string = session.user;
    try {
      await this.authService.verifyToken(user);
      const url = new URL(successUrl);
      url.searchParams.append('token', user);
      res.redirect(url.toString());
    } catch (e) {
      session.destroy();
      const url = new URL(failUrl);
      res.redirect(url.toString());
    }
  }

  @Get('verify_token/:token')
  async verifyToken(@Param('token') token: string) {
    return await this.authService.verifyToken(token);
  }
}
