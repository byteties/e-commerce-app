import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Product } from '../products/product.interface';
import { Types } from 'mongoose';

describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

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
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            getCart: jest.fn(),
            addToCart: jest.fn(),
            removeFromCart: jest.fn(),
            updateQuantity: jest.fn(),
            clearCart: jest.fn(),
            getCartProducts: jest.fn().mockResolvedValue([{
              product: mockProduct,
              quantity: 1
            }])
          },
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCart', () => {
    it('should return cart items', () => {
      const mockCart = [{ productId: mockProduct._id.toString(), quantity: 1 }];
      jest.spyOn(service, 'getCart').mockReturnValue(mockCart);
      expect(controller.getCart()).toBe(mockCart);
    });
  });

  describe('addToCart', () => {
    it('should add item to cart', () => {
      const addToCartDto = { productId: mockProduct._id.toString() };
      controller.addToCart(addToCartDto);
      expect(service.addToCart).toHaveBeenCalledWith(mockProduct._id.toString());
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      controller.removeFromCart(mockProduct._id.toString());
      expect(service.removeFromCart).toHaveBeenCalledWith(mockProduct._id.toString());
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const updateQuantityDto = { productId: mockProduct._id.toString(), quantity: 2 };
      controller.updateQuantity(updateQuantityDto);
      expect(service.updateQuantity).toHaveBeenCalledWith(mockProduct._id.toString(), 2);
    });
  });

  describe('clearCart', () => {
    it('should clear cart', () => {
      controller.clearCart();
      expect(service.clearCart).toHaveBeenCalled();
    });
  });

  describe('getCartProducts', () => {
    it('should return cart items with product details', async () => {
      const result = await controller.getCartProducts();
      expect(result).toEqual([{
        product: mockProduct,
        quantity: 1
      }]);
      expect(service.getCartProducts).toHaveBeenCalled();
    });
  });
}); 