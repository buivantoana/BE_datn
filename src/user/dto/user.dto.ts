import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly role?: string;
}
export class SigninDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
export class idUserDto {
  readonly id: string;
}
