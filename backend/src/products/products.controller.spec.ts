import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

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
      const result = { data: 'some product list' };
      jest.spyOn(service, 'getProducts').mockResolvedValue(result); 

      expect(await controller.getProducts(1, 10)).toBe(result);
    });
  });

  describe('getProduct', () => {
    it('should return a product by id', async () => {
      const result = { id: '1', name: 'Product 1' };
      jest.spyOn(service, 'getProduct').mockResolvedValue(result);

      expect(await controller.getProduct(1)).toBe(result);
    });
  });
});
