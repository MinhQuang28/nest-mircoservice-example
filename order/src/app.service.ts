import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderRequest } from './order-request.dto';
import { CreateOrderEvent } from './order.event';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(@Inject('AUTH') private readonly authClient: ClientProxy) {}

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

  getAnalytics() {
    return this.authClient.send({ cmd: 'get_orders' }, {});
  }
}
