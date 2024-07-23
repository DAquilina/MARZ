export interface Order {
    OrderID: number;
    CustomerID: number;
    ProductID: number;
    OrderStatus: string;
}

export interface OrderData {
  Queued: Order[],
  InProgress: Order[],
  QA: Order[],
}
