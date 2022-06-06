import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './app.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthHeaderStrategy } from './strategies/jwt-header.strategy';
import { User } from './users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  async getHello() {
    return 'Hello World!';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(user, response);
    response.send({ user, token });
  }
  @UseGuards(JwtAuthGuard)
  @Post('log')
  async checkLogin(
    @CurrentUser() user: User,
    @Body() request: any,
    @Req() req: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(user);
    response.send({ request });
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
  @EventPattern('user_created')
  handleUserCreated(data: any, @Res() response: Response) {
    response.send({ data });
  }
  @MessagePattern('get_analytics')
  async logUser(@Body() request: any, @CurrentUser() user: User) {
    console.log('get mes', request);
    return request;
  }
}
