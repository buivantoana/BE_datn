import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieModel } from './schema/movie.schema';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieModel }]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
