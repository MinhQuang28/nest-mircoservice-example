import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getAnalytics();
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() request: any,
    @Req() req: any,
    @Res() response: Response,
  ) {
    console.log('log user', req.user);
    return response.send(request);
  }
}
