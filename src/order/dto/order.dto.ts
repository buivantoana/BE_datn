import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class OrderDto {
 
  @IsNotEmpty()
  readonly status: boolean;
  @IsArray()
  readonly user_id: [string];
  @IsArray()
  readonly courses_id: [string];
}

export class idOrderDto {
  readonly id: string;
}
