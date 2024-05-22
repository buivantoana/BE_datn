import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { RolePermission } from 'src/role_permission/schema/role_permission.schema';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(RolePermission.name)
    private readonly rolePermissionModel: Model<RolePermission>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = request.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = verify(token, 'token');
      let data = await this.rolePermissionModel
        .find({})
        .populate(['permission', 'role_id'])
        .lean()
        .exec();

       
      if (
        data
          .filter((item) => item.role_id[0].name === decodedToken.role)[0]
          .permission.map((child) => child.name)
          .some((role: any) => role.includes(roles))
      ) {
        return true;
      } else {
        response.status(200).json({
          status: 1,
          message: 'Bạn không có quyền.',
        });
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
