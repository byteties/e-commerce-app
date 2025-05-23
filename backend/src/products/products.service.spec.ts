import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PexelsService } from '../pexels/pexels.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let pexelsService: PexelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PexelsService,
          useValue: {
            getImages: jest.fn(), 
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    pexelsService = module.get<PexelsService>(PexelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return a list of products with images', async () => {
      const mockImages = {
        photos: [
          { src: { medium: 'http://example.com/image.jpg' } },
        ],
      };

      jest.spyOn(pexelsService, 'getImages').mockResolvedValue(mockImages);

      const result = await service.getProducts(1, 10);

      expect(pexelsService.getImages).toHaveBeenCalledWith('Car', 1, 1);
      expect(result.data[0].image).toBe('http://example.com/image.jpg');
    });

    it('should use default image if no image is found', async () => {
      const mockImages = { photos: [] };

      jest.spyOn(pexelsService, 'getImages').mockResolvedValue(mockImages);

      const result = await service.getProducts(1, 10);

      expect(result.data[0].image).toBe('assets/animal-login-illustration.png');
    });
  });

  describe('getProduct', () => {
    it('should return a product by id', () => {
      const result = service.getProduct('1');

      expect(result).toEqual({
        id: 1,
        name: 'Car',
        price: 100,
        image: '',
        details: 'This is a car',
        category: 'Electronic',
      });
    });

    it('should return undefined if product id does not exist', () => {
      const result = service.getProduct('999');

      expect(result).toBeUndefined();
    });
  });
});
