import { CartItemModel } from './cart-item.model';

export class CartModel {
  constructor(
    public items: CartItemModel[] = [],
    public total: number = 0,
  ) {}
}
