import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs'; 
import { PIXEL_URL } from '../contains';

@Injectable()
export class PexelsService {
  private readonly apiKey = 'GUf57xVNtrNOnKgBoyWquFYskHgtJoRlLFNq5R3sN9DR41yueLP48iYU';
  private readonly apiUrl = PIXEL_URL;

  constructor(private readonly httpService: HttpService) {}

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
