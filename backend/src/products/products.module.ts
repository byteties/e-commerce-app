import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PexelsService } from 'src/pexels/pexels.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService,PexelsService],
})
export class ProductsModule {}
