import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class screeningsDto {
  @IsString()
  @IsNotEmpty()
  readonly date: string;
  @IsArray()
  @IsNotEmpty()
  readonly timeSlots: any[];
  @IsArray()
  readonly movies: [string];
  @IsArray()
  readonly cinemas: [string];
}

export class idscreeningsDto {
  readonly id: string;
}
