import { IsInt, IsPositive, IsString } from 'class-validator';

export class UpdateQuantityDto {
  @IsString()
  productId: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
