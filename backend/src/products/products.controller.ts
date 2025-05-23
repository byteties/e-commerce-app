import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
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

    @Get("/:id")
    getProduct(@Param('id', ParseIntPipe) id: number): any {
        return this.productsService.getProduct(id);
    }
}
