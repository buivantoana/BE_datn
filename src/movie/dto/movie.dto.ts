import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class movieDto {
  @IsNumber()
  @IsNotEmpty()
  readonly movie_id: number;
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  readonly poster_path1: string;
  @IsString()
  @IsNotEmpty()
  readonly poster_path2: string;
  @IsString()
  @IsNotEmpty()
  readonly backdrop_path: string;
  @IsString()
  @IsNotEmpty()
  readonly overview: string;
  @IsString()
  @IsNotEmpty()
  readonly release_date: string;
  @IsString()
  @IsNotEmpty()
  readonly times: string;
  @IsString()
  @IsNotEmpty()
  readonly traler: string;
  @IsArray()
  readonly genders: [string];
}
export class movieUpdateDto {
  
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  
  @IsString()
  @IsNotEmpty()
  readonly overview: string;
  @IsString()
  @IsNotEmpty()
  readonly release_date: string;
  @IsString()
  @IsNotEmpty()
  readonly times: string;
  @IsString()
  @IsNotEmpty()
  readonly traler: string;
 
}

export class idmovieDto {
  readonly id: string;
}
