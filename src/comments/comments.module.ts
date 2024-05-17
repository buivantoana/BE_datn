import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsModel } from './schema/comments.schema';
import { AppGateway } from './comments.gateway';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsModel },
    ]),
  ],
  providers: [AppGateway],
})
export class CommentsModule {}
