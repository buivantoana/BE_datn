import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class BookingDto {
  @IsString()
  @IsNotEmpty()
  readonly address: string;
  @IsString()
  @IsNotEmpty()
  readonly cinemas: string;
  @IsString()
  @IsNotEmpty()
  readonly drink: string;
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly fullname: string;
  @IsString()
  @IsNotEmpty()
  readonly movie: string;
  @IsString()
  @IsNotEmpty()
  readonly order_id: string;
  @IsString()
  @IsNotEmpty()
  readonly ordernote: string;
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
  @IsString()
  @IsNotEmpty()
  readonly screeningId: string;
  @IsString()
  @IsNotEmpty()
  readonly times: string;
  @IsNumber()
  @IsNotEmpty()
  readonly total: number;

  @IsArray()
  @IsNotEmpty()
  readonly seats: [string];
  @IsArray()
  @IsNotEmpty()
  readonly movies: [string];
}
export class idBookingDto {
  readonly id: string;
}
