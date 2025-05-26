import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CartItem, ProductCartItem } from './cart-item.interface';

@Injectable()
export class CartService {
  private cart: CartItem[] = [];

  constructor(private readonly productsService: ProductsService) {}

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(productId: string, quantity: number = 1): void {
    const existingItem = this.cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ productId, quantity });
    }
  }

  removeFromCart(productId: string): void {
    this.cart = this.cart.filter(item => item.productId !== productId);
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cart.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  clearCart(): void {
    this.cart = [];
  }

  async getCartProducts(): Promise<ProductCartItem[]> {
    const cartProducts: ProductCartItem[] = [];
    for (const item of this.cart) {
      const product = await this.productsService.getProduct(item.productId.toString());
      cartProducts.push({
        product: product,
        quantity: item.quantity
      });
    }
    return cartProducts;
  }
}
