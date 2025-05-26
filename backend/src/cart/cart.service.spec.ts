import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.interface';
import { Types } from 'mongoose';

describe('CartService', () => {
  let service: CartService;
  let productsService: ProductsService;

  const mockProduct: Product = {
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
        CartService,
        {
          provide: ProductsService,
          useValue: {
            getProduct: jest.fn().mockResolvedValue(mockProduct),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCart', () => {
    it('should return empty cart initially', () => {
      expect(service.getCart()).toEqual([]);
    });
  });

  describe('addToCart', () => {
    it('should add new item to cart', () => {
      service.addToCart(mockProduct._id.toString());
      expect(service.getCart()).toEqual([{ productId: mockProduct._id.toString(), quantity: 1 }]);
    });

    it('should increment quantity for existing item', () => {
      service.addToCart(mockProduct._id.toString());
      service.addToCart(mockProduct._id.toString());
      expect(service.getCart()).toEqual([{ productId: mockProduct._id.toString(), quantity: 2 }]);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      service.addToCart(mockProduct._id.toString());
      service.removeFromCart(mockProduct._id.toString());
      expect(service.getCart()).toEqual([]);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      service.addToCart(mockProduct._id.toString());
      service.updateQuantity(mockProduct._id.toString(), 3);
      expect(service.getCart()).toEqual([{ productId: mockProduct._id.toString(), quantity: 3 }]);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      service.addToCart(mockProduct._id.toString());
      service.addToCart(new Types.ObjectId().toString());
      service.clearCart();
      expect(service.getCart()).toEqual([]);
    });
  });

  describe('getCartProducts', () => {
    it('should return cart items with product details', async () => {
      service.addToCart(mockProduct._id.toString());
      const result = await service.getCartProducts();
      expect(result).toEqual([{
        product: mockProduct,
        quantity: 1
      }]);
      expect(productsService.getProduct).toHaveBeenCalledWith(mockProduct._id.toString());
    });
  });
}); 