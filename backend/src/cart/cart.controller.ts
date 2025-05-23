import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from './cart-item.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('')
  getCart(): CartItem[] {
    return this.cartService.getCart();
  }

  @Post('add')
  addToCart(@Body() body: { productId: number }): void {
    const { productId } = body;
    this.cartService.addToCart(productId);
  }

  @Delete('remove/:productId')
  removeFromCart(@Param('productId') productId: number): void {
    this.cartService.removeFromCart(Number(productId));
  }

  @Post('update')
  updateQuantity(
    @Body('productId') productId: number,
    @Body('quantity') quantity: number
  ): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  @Delete('clear')
  clearCart(): void {
    this.cartService.clearCart();
  }

  @Get('items')
  getCartProducts() {
    return this.cartService.getCartProducts();
  }
}
