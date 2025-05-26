import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  const mockProduct = {
    _id: new Types.ObjectId(),
    name: 'Test Product',
    price: 100,
    image: 'test.jpg',
    details: 'Test details',
    category: 'Test category'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            find: jest.fn().mockReturnValue({
              skip: jest.fn().mockReturnValue({
                limit: jest.fn().mockReturnValue({
                  exec: jest.fn().mockResolvedValue([mockProduct])
                })
              })
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockProduct)
            }),
            findOne: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockProduct)
            }),
            countDocuments: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(1)
            }),
            create: jest.fn().mockResolvedValue(mockProduct),
            deleteMany: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({ deletedCount: 0 })
            }),
            collection: {
              drop: jest.fn().mockResolvedValue(undefined)
            },
            insertMany: jest.fn().mockResolvedValue([mockProduct])
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return paginated products with correct data', async () => {
      const result = await service.getProducts(1, 10);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.data[0]).toEqual(mockProduct);
    });
  });

  describe('getProduct', () => {
    it('should return a product by id', async () => {
      const result = await service.getProduct(mockProduct._id.toString());
      expect(result).toEqual(mockProduct);
      expect(model.findById).toHaveBeenCalledWith(mockProduct._id.toString());
    });

    it('should throw NotFoundException if product id does not exist', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null)
      } as any);

      const nonExistentId = 'nonexistent';
      await expect(service.getProduct(nonExistentId)).rejects.toThrow(
        new NotFoundException(`Product with ID ${nonExistentId} not found`)
      );
      expect(model.findById).toHaveBeenCalledWith(nonExistentId);
    });
  });

  describe('seedProducts', () => {
    it('should seed products successfully', async () => {
      const result = await service.seedProducts();
      expect(result).toBeUndefined();
      expect(model.collection.drop).toHaveBeenCalled();
      expect(model.insertMany).toHaveBeenCalled();
    });
  });
});
