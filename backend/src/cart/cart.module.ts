import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CartController } from './cart.comtroller';
import { CartService } from './cart.service';

@Module({
  imports: [HttpModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
