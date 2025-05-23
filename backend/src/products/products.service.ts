import { Injectable } from '@nestjs/common';
import { PexelsService } from 'src/pexels/pexels.service';

@Injectable()
export class ProductsService {
    private products = [
        {id: 1, name: 'Car', price: 100, image: 'https://via.placeholder.com/150',details: 'This is a car',category: 'Car'},
        {id: 2, name: 'Book', price: 200, image: 'https://via.placeholder.com/150',details: 'This is a book',category: 'Book'},
        {id: 3, name: 'Computer', price: 300, image: 'https://via.placeholder.com/150',details: 'This is a computer',category: 'Computer'},
        {id: 4, name: 'Phone', price: 400, image: 'https://via.placeholder.com/150',details: 'This is a phone',category: 'Phone'},
        {id: 5, name: 'Watch', price: 500, image: 'https://via.placeholder.com/150',details: 'This is a watch',category: 'Watch'},
        {id: 6, name: 'T-shirt', price: 600, image: 'https://via.placeholder.com/150',details: 'This is a t-shirt',category: 'T-shirt'},
        {id: 7, name: 'Shoes', price: 700, image: 'https://via.placeholder.com/150',details: 'This is a shoes',category: 'Shoes'},
        {id: 8, name: 'Hat', price: 800, image: 'https://via.placeholder.com/150',details: 'This is a hat',category: 'Hat'},
        {id: 9, name: 'Jacket', price: 900, image: 'https://via.placeholder.com/150',details: 'This is a jacket',category: 'Jacket'},
        {id: 10, name: 'Trousers', price: 1000, image: 'https://via.placeholder.com/150',details: 'This is a trousers',category: 'Trousers'},    
        {id: 11, name: 'Socks', price: 1100, image: 'https://via.placeholder.com/150',details: 'This is a socks',category: 'Socks'},
        {id: 12, name: 'Gloves', price: 1200, image: 'https://via.placeholder.com/150',details: 'This is a gloves',category: 'Gloves'},
        {id: 13, name: 'Scarf', price: 1300, image: 'https://via.placeholder.com/150',details: 'This is a scarf',category: 'Scarf'},
        {id: 14, name: 'Gown', price: 1400, image: 'https://via.placeholder.com/150',details: 'This is a gown',category: 'Gown'},
        {id: 15, name: 'Dress', price: 1500, image: 'https://via.placeholder.com/150',details: 'This is a dress',category: 'Dress'},
        {id: 16, name: 'Skirt', price: 1600, image: 'https://via.placeholder.com/150',details: 'This is a skirt',category: 'Skirt'},
    ]

    constructor(private readonly pexelsService: PexelsService) {}

    async getImages(query: string, page: number = 1, perPage: number = 10) {
        const images = await this.pexelsService.getImages(query, page, perPage);
        return images;
    }
    
    async getProducts(page: number = 1, limit: number = 10): Promise<any> {

        const imagePromises = this.products.map(async (product) => {
            const image = await this.getImages(product.name, 1, 1);
            product.image = image.photos[0]?.src.medium;
        });
    
        await Promise.all(imagePromises);
        return {
            data: this.products.slice((page - 1) * limit, page * limit),
            total: this.products.length,
            page: page,
            limit: limit
        }
    }

    getProduct(id: string): any {
        return this.products.find(product => product.id === parseInt(id));
    }
}
