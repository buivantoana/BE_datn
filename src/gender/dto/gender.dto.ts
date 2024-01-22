import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class genderDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsArray()
  readonly movies: [string];
}

export class idgenderDto {
  readonly id: string;
}
