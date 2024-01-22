import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SigninDto, SignupDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('signup')
  async signup(
    // @Res() res: Response,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    user: SignupDto,
  ) {
    try {
      console.log(user);
      return await this.userService.signup(user);
    } catch (error) {
      return {
        status: 1,
        message: 'create user faild',
        error,
      };
    }
  }
  @Post('signin')
  async signin(
    // @Res() res: Response,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    user: SigninDto,
  ) {
    try {
      return await this.userService.signin(user);
    } catch (error) {
      return {
        status: 1,
        message: 'create user faild',
        error,
      };
    }
  }
  @Get('authentication')
  async authentication(@Req() req: Request, @Res() res: Response) {
    try {
      return res
        .status(200)
        .json({ status: 0, message: 'success', data: req.body.user });
    } catch (error) {}
  }
  @Get('refeshtoken')
  async refeshtoken(@Req() req: Request) {
    try {
      let token = req.headers.authorization.split(' ')[1];
      if (token) {
        return await this.userService.refeshtoken(token);
      }
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
