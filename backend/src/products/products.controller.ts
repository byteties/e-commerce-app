import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get("/")
    getProducts(@Query() query: GetProductsDto): Promise<any> {
        const { page, limit } = query;
        return this.productsService.getProducts(page, limit);
    }

    @Get("/:id")
    getProduct(@Param('id', ParseIntPipe) id: number): any {
        return this.productsService.getProduct(id);
    }
}
