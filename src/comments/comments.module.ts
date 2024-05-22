import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsModel } from './schema/comments.schema';
import { AppGateway } from './comments.gateway';
import { User, UserModel } from 'src/user/schema/user.schema';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsModel },
      { name: User.name, schema: UserModel },
    ]),
  ],
  providers: [AppGateway],
})
export class CommentsModule {}
