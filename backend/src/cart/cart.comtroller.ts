import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from './cart-item.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() productId: number): void {
    this.cartService.addToCart(productId);
  }

  @Delete('remove/:productId')
  removeFromCart(@Param('productId') productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  @Post('update')
  updateQuantity(
    @Body('productId') productId: number,
    @Body('quantity') quantity: number
  ): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  @Get('items')
  getCart(): CartItem[] {
    return this.cartService.getCart();
  }

  @Get('count')
  getCartCount(): number {
    return this.cartService.getCartCount();
  }

  @Delete('clear')
  clearCart(): void {
    this.cartService.clearCart();
  }
}
