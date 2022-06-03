export class CreateOrderEvent {
  constructor(public readonly data: { orderName: string; title: string }) {}
}
