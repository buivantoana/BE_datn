import { Injectable } from '@nestjs/common';
import { IUser } from './interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { EmailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  private readonly secretKey = 'token';
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly mailService: EmailService,
  ) {}

  generateRandomPassword(length: number) {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?/{}[]';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  async createToken(user: IUser) {
    let token = await sign(
      { email: user.email, role: user.role,_id:user._id },
      this.secretKey,
      { expiresIn: '30s' },
    );
    return token;
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async signup(user: IUser): Promise<any> {
    try {
      let email = await this.userModel.find({ email: user.email });
      if (email[0]) {
        return {
          status: 1,
          message: 'Email da ton tai',
        };
      }
      let password = this.generateRandomPassword(6);
      let mail = await this.mailService.sendMail(
        'toanbvph30125@fpt.edu.vn',
        'Signup PassWord',
        password,
      );
      if (!mail) {
        return {
          status: 1,
          message: 'gui mail that bai',
        };
      }
      password = await this.hashPassword(password);

      const data = new this.userModel({ ...user, password }).save();

      return {
        status: 0,
        message: 'create user success',
        data,
      };
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  async signin(user: IUser) {
    try {
      
      let data = await this.userModel.find({ email: user.email });
      
      if (!data[0]) {
        return {
          status: 1,
          message: 'email ko ton tai',
        };
      }
      let password = await bcrypt.compare(user.password, data[0].password);
      console.log(password);
      if (!password) {
        return {
          status: 1,
          message: 'Mat khau sai',
        };
      }
      let token = await this.createToken({
        email: data[0].email,
        role: data[0].role,
        _id: data[0]._id,
      });
      let refeshToken = await sign(
        {
          email: data[0].email,
          role: data[0].role,
          _id: data[0]._id,
        },
        this.secretKey,
      );
      data[0].password = null;
      return {
        token,
        refeshToken,
        data,
      };
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  async refeshtoken(token: string) {
    try {
      let data: any = await verify(token, this.secretKey);

      if (data) {
        let newdata = {
          email: data.email,
          role: data.role,
          _id: data._id,
        };
        let accessToken = await this.createToken(newdata);

        return {
          status: 0,
          message: 'token refesh',
          accessToken: accessToken,
          data,
        };
      }
    } catch (error) {}
  }
}
