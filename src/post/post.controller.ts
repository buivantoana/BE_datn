import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto, idPostDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Post('')
  async createPost(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    post: PostDto,
  ) {
    try {
      return await this.postService.createPost(post);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Put(':id')
  async updatePost(
    @Param('id', new ValidationPipe({ transform: true })) id: idPostDto,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    post: PostDto,
  ) {
    try {
      return await this.postService.updatePost(String(id), post);
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Delete(':id')
  async deletePost(
    @Param('id', new ValidationPipe({ transform: true })) id: idPostDto,
  ) {
    try {
      return await this.postService.deletePost(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get('')
  async fillAllPost() {
    try {
      return await this.postService.fillAllPost();
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
  @Get(':id')
  async fillOnePost(
    @Param('id', new ValidationPipe({ transform: true })) id: idPostDto,
  ) {
    try {
      return await this.postService.fillOnePost(String(id));
    } catch (error) {
      return {
        status: 1,
        message: error,
      };
    }
  }
}
