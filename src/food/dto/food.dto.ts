import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class FoodDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly image: string;
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
  @IsString()
  @IsNotEmpty()
  readonly slug: string;
  
}

export class idFoodDto {
  readonly id: string;
}
