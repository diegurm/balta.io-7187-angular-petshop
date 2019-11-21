import { CartModel } from '../models/cart.model';
import { CartItemModel } from '../models/cart-item.model';

const _CART = 'petshopcart';

export class CartUtil {
  public static get(): CartModel {
    const data = localStorage.getItem(_CART);

    if (!data) {
      return new CartModel();
    }

    return JSON.parse(data);
  }

  public static add(
    id: string,
    product: string,
    quantity: number,
    price: number,
    image: string,
  ) {
    const cart = this.get();

    const item = new CartItemModel(id, product, quantity, price, image);
    cart.items.push(item);

    localStorage.setItem(_CART, JSON.stringify(cart));
  }

  public static update(cart: CartModel) {
    localStorage.setItem(_CART, JSON.stringify(cart));
  }

  public static clear() {
    localStorage.removeItem(_CART);
  }
}
