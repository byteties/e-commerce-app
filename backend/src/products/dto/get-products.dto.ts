import { IsInt, IsOptional, Min, Max } from 'class-validator';

export class GetProductsDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number;
}
