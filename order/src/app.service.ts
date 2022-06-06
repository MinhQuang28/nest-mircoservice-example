import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, tap } from 'rxjs';
import { AUTH_SERVICE } from './auth/services';
import { CreateOrderRequest } from './order-request.dto';
import { CreateOrderEvent, dataEvent } from './order.event';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateOrderRequest) {
    this.users.push(createUserRequest);
    this.authClient.emit(
      'user_created',
      new CreateOrderEvent(createUserRequest),
    );
  }

  async getAnalytics() {
    return await this.authClient.send('get_analytics', {
      method: 'get',
      mess: 'get_analytics',
    });
  }
}
