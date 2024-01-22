import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CinemasDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly location: string;
  @IsString()
  @IsNotEmpty()
  readonly slug: string;
  @IsString()
  @IsNotEmpty()
  readonly pointLat: string;
  @IsString()
  @IsNotEmpty()
  readonly pointLng: string;
}

export class idCinemasDto {
  readonly id: string;
}
