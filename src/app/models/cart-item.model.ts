export class CartItemModel {
  constructor(
    public id: string,
    public product: string,
    public quantity: number,
    public price: number,
    public image: string,
  ) {}
}
