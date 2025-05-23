import { IsInt, IsPositive } from 'class-validator';

export class UpdateQuantityDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}
