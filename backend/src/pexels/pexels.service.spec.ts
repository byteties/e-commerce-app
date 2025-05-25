import { Test, TestingModule } from '@nestjs/testing';
import { PexelsService } from './pexels.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs'; 

jest.mock('@nestjs/axios')
jest.mock('../contains', () => ({
  PIXEL_URL: 'https://mocked-url.com/v1/search',
}))

describe('PexelsService', () => {
  let pexelsService: PexelsService;
  let httpService: HttpService;
  const mockApiKey = 'test-api-key';

  beforeEach(async () => {
    console.info = jest.fn;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PexelsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(), 
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'PEXELS_API_KEY') return mockApiKey;
              return null;
            }),
          },
        },
      ],
    }).compile();

    pexelsService = module.get<PexelsService>(PexelsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(pexelsService).toBeDefined();
  });

  describe('getImages', () => {
    it('should fetch images successfully', async () => {
      const mockResponse = {
        data: {
          photos: [
            { id: 1, photographer: 'John Doe', url: 'http://example.com/photo1' },
          ],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any
      };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

      const result = await pexelsService.getImages('nature');

      expect(result).toEqual(mockResponse.data);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://mocked-url.com/v1/search',
        expect.objectContaining({
          params: { query: 'nature', page: 1, per_page: 10 },
          headers: { Authorization: mockApiKey },
        }),
      );
    });

    it('should handle errors when fetching images', async () => {
      jest.spyOn(httpService, 'get').mockReturnValueOnce(throwError(() => new Error('Failed to fetch images')));

      const result = await pexelsService.getImages('nature');

      expect(result).toBeUndefined(); 
      expect(httpService.get).toHaveBeenCalled();
    });
  });
});
