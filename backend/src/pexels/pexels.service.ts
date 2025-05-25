import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs'; 
import { PIXEL_URL } from '../contains';

@Injectable()
export class PexelsService {
  private readonly apiKey: string | undefined;
  private readonly apiUrl = PIXEL_URL;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('PEXELS_API_KEY');
  }

  async getImages(query: string, page: number = 1, perPage: number = 10) {
    const headers = {
      Authorization: this.apiKey,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.get(this.apiUrl, {
          params: { query, page, per_page: perPage },
          headers,
        })
      );
      return response.data;
    } catch (error) {
      console.info('Failed to fetch images from Pexels', error);
    }
  }
}
