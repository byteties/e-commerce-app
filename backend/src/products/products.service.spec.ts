import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return paginated products with correct data', async () => {
      const result = await service.getProducts(1, 10);

      expect(result.data).toHaveLength(10);
      expect(result.total).toBe(21);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.data[0]).toEqual({
        id: 1,
        name: 'Car',
        price: 100,
        image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&h=350',
        details: 'This is a car',
        category: 'Electronic'
      });
    });
  });

  describe('getProduct', () => {
    it('should return a product by id', () => {
      const result = service.getProduct(1);

      expect(result).toEqual({
        id: 1,
        name: 'Car',
        price: 100,
        image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&h=350',
        details: 'This is a car',
        category: 'Electronic',
      });
    });

    it('should return undefined if product id does not exist', () => {
      const result = service.getProduct(999);

      expect(result).toBeUndefined();
    });
  });
});
