import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserMiddleware } from './middleware/user.middleware';
import { MongodbConnect } from './connect/mongodb.module';
import { CookieMiddleware } from './middleware/cookies.middleware';
import { BookingModule } from './booking/booking.module';
import { AppGateway } from './seat/app.gateway';
import { SeatModule } from './seat/seat.module';
import { GenderModule } from './gender/gender.module';
import { MovieModule } from './movie/movie.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { ScreeningsModule } from './screenings/screenings.module';
import { FoodModule } from './food/food.module';
import { MailModule } from './mail/mail.module';
import { PostModule } from './post/post.module';
import { VnpayModule } from './vnpay/vnpay.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role_permission/role_permission.module';

@Module({
  imports: [
    MongodbConnect,
    UserModule,
    BookingModule,
    SeatModule,
    GenderModule,
    MovieModule,
    CinemasModule,
    ScreeningsModule,
    FoodModule,
    MailModule,
    PostModule,
    VnpayModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieMiddleware).forRoutes('*');
  }
}
