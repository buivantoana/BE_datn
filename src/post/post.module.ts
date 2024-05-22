import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostModel } from './schema/post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {
  RolePermission,
  RolePermissionModel,
} from 'src/role_permission/schema/role_permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostModel },
      { name: RolePermission.name, schema: RolePermissionModel },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
