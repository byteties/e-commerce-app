import { Controller, Post, Body, Param, Delete, Get, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from './cart-item.interface';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('')
  getCart(): CartItem[] {
    return this.cartService.getCart();
  }

  @Post('add')
  addToCart(@Body() body: AddToCartDto): void {
    const { productId } = body;
    this.cartService.addToCart(productId);
  }

  @Delete('remove/:id')
  removeFromCart(@Param('id', ParseIntPipe) id: number): void {
    this.cartService.removeFromCart(id);
  }

  @Post('update')
  updateQuantity(
    @Body() body: UpdateQuantityDto
  ): void {
    const { productId, quantity } = body;
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
