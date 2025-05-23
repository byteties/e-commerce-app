import { Injectable } from '@nestjs/common';
import { PexelsService } from '../pexels/pexels.service';

@Injectable()
export class ProductsService {
    private defaultImage = 'assets/animal-login-illustration.png';
    private products = [
        {id: 1, name: 'Car', price: 100, image: '',details: 'This is a car',category: 'Electronic'},
        {id: 2, name: 'Book', price: 200, image: '',details: 'This is a book',category: 'Education'},
        {id: 3, name: 'Computer', price: 300, image: '',details: 'This is a computer',category: 'Electronic'},
        {id: 4, name: 'Phone', price: 400, image: '',details: 'This is a phone',category: 'Electronic'},
        {id: 5, name: 'Watch', price: 100, image: '',details: 'This is a watch',category: 'Electronic'},
        {id: 6, name: 'Car 2', price: 100, image: '',details: 'This is a car',category: 'Electronic'},
        {id: 7, name: 'Book 2', price: 200, image: '',details: 'This is a book',category: 'Education'},
        {id: 8, name: 'Computer 2', price: 300, image: '',details: 'This is a computer',category: 'Electronic'},
        {id: 9, name: 'Phone 2', price: 400, image: '',details: 'This is a phone',category: 'Electronic'},
        {id: 10, name: 'Watch 2', price: 500, image: '',details: 'This is a watch',category: 'Electronic'},
        {id: 11, name: 'T-shirt', price: 100, image: '',details: 'This is a t-shirt',category: 'Clothing'},
        {id: 12, name: 'Shoes', price: 700, image: '',details: 'This is a shoes',category: 'Clothing'},
        {id: 13, name: 'Hat', price: 800, image: '',details: 'This is a hat',category: 'Clothing'},
        {id: 14, name: 'Jacket', price: 900, image: '',details: 'This is a jacket',category: 'Clothing'},
        {id: 15, name: 'Trousers', price: 100, image: '',details: 'This is a trousers',category: 'Clothing'},    
        {id: 16, name: 'Socks', price: 1100, image: '',details: 'This is a socks',category: 'Clothing'},
        {id: 17, name: 'Gloves', price: 100, image: '',details: 'This is a gloves',category: 'Clothing'},
        {id: 18, name: 'Scarf', price: 1300, image: '',details: 'This is a scarf',category: 'Clothing'},
        {id: 19, name: 'Gown', price: 1400, image: '',details: 'This is a gown',category: 'Clothing'},
        {id: 20, name: 'Dress', price: 1500, image: '',details: 'This is a dress',category: 'Clothing'},
        {id: 21, name: 'Skirt', price: 1600, image: '',details: 'This is a skirt',category: 'Clothing'},
    ]

    constructor(private readonly pexelsService: PexelsService) {}

    async getImages(query: string, page: number = 1, perPage: number = 10) {
        const images = await this.pexelsService.getImages(query, page, perPage);
        return images;
    }
    
    async getProducts(page: number = 1, limit: number = 10): Promise<any> {

        const imagePromises = this.products.map(async (product) => {
            const image = await this.getImages(product.name, 1, 1);
            if(image && image.photos && image.photos.length > 0) {
                product.image = image.photos[0]?.src?.medium;
            } else {
                product.image = this.defaultImage;
            }
            return product;
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
