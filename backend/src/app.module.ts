import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://root:example@mongo:27017/mydb?authSource=admin'),
    ProductsModule, 
    AuthModule, 
    UsersModule, 
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService, CartService],
})
export class AppModule {}
