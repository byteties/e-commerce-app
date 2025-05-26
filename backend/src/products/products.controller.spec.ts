import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Types } from 'mongoose';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProducts: jest.fn(),
            getProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return a list of products', async () => {
      const result = {
        data: [{
          _id: new Types.ObjectId(),
          name: 'Test Product',
          price: 100,
          image: 'test.jpg',
          details: 'Test details',
          category: 'Test category'
        }],
        total: 1,
        page: 1,
        limit: 10
      };
      jest.spyOn(service, 'getProducts').mockResolvedValue(result); 

      expect(await controller.getProducts(1, 10)).toBe(result);
    });
  });

  describe('getProduct', () => {
    it('should return a product by id', async () => {
      const result = {
        _id: new Types.ObjectId(),
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        details: 'Test details',
        category: 'Test category'
      };
      jest.spyOn(service, 'getProduct').mockResolvedValue(result);

      expect(await controller.getProduct(result._id.toString())).toBe(result);
    });
  });
});
