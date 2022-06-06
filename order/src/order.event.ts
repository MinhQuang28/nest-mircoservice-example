export class CreateOrderEvent {
  constructor(public readonly data: { orderName: string; title: string }) {}
}
export class dataEvent {
  constructor(public readonly data: any) {}
}
