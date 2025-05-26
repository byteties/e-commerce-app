import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
    private products = [
        {id: 1, name: 'Car', price: 100, image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a car',category: 'Electronic'},
        {id: 2, name: 'Book', price: 200, image: 'https://images.pexels.com/photos/4132936/pexels-photo-4132936.png?auto=compress&cs=tinysrgb&h=350',details: 'This is a book',category: 'Education'},
        {id: 3, name: 'Computer', price: 300, image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a computer',category: 'Electronic'},
        {id: 4, name: 'Phone', price: 400, image: 'https://images.pexels.com/photos/5206291/pexels-photo-5206291.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a phone',category: 'Electronic'},
        {id: 5, name: 'Watch', price: 100, image: 'https://images.pexels.com/photos/5858713/pexels-photo-5858713.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a watch',category: 'Electronic'},
        {id: 6, name: 'Car 2', price: 100, image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a car',category: 'Electronic'},
        {id: 7, name: 'Book 2', price: 200, image: 'https://images.pexels.com/photos/2898207/pexels-photo-2898207.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a book',category: 'Education'},
        {id: 8, name: 'Computer 2', price: 300, image: 'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a computer',category: 'Electronic'},
        {id: 9, name: 'Phone 2', price: 400, image: 'https://images.pexels.com/photos/5882581/pexels-photo-5882581.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a phone',category: 'Electronic'},
        {id: 10, name: 'Watch 2', price: 500, image: 'https://images.pexels.com/photos/4261789/pexels-photo-4261789.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a watch',category: 'Electronic'},
        {id: 11, name: 'T-shirt', price: 100, image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a t-shirt',category: 'Clothing'},
        {id: 12, name: 'Shoes', price: 700, image: 'https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&h=350',details: 'This is a shoes',category: 'Clothing'},
        {id: 13, name: 'Hat', price: 800, image: 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a hat',category: 'Clothing'},
        {id: 14, name: 'Jacket', price: 900, image: 'https://images.pexels.com/photos/747470/pexels-photo-747470.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a jacket',category: 'Clothing'},
        {id: 15, name: 'Trousers', price: 100, image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a trousers',category: 'Clothing'},    
        {id: 16, name: 'Socks', price: 1100, image: 'https://images.pexels.com/photos/251454/pexels-photo-251454.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a socks',category: 'Clothing'},
        {id: 17, name: 'Gloves', price: 100, image: 'https://images.pexels.com/photos/3959482/pexels-photo-3959482.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a gloves',category: 'Clothing'},
        {id: 18, name: 'Scarf', price: 1300, image: 'https://images.pexels.com/photos/2120584/pexels-photo-2120584.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a scarf',category: 'Clothing'},
        {id: 19, name: 'Gown', price: 1400, image: 'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a gown',category: 'Clothing'},
        {id: 20, name: 'Dress', price: 1500, image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a dress',category: 'Clothing'},
        {id: 21, name: 'Skirt', price: 1600, image: 'https://images.pexels.com/photos/601316/pexels-photo-601316.jpeg?auto=compress&cs=tinysrgb&h=350',details: 'This is a skirt',category: 'Clothing'},
    ]

    constructor() {}
    
    async getProducts(page: number = 1, limit: number = 10): Promise<any> {
        return {
            data: this.products.slice((page - 1) * limit, page * limit),
            total: this.products.length,
            page: page,
            limit: limit
        }
    }

    getProduct(id: number): any {
        return this.products.find(product => product.id === id);
    }
}
