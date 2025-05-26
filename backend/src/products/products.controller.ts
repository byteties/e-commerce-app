import { Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get("")
    getProducts(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ): Promise<any> {
        return this.productsService.getProducts(page, limit);
    }

    @Post("/seed")
    seedProducts(): Promise<void> {
        return this.productsService.seedProducts();
    }

    @Get("/:id")
    getProduct(@Param('id') id: string): any {
        return this.productsService.getProduct(id);
    }

}
