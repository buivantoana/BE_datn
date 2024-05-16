import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { MongodbConnect } from './connect/mongodb.module';

import { MailModule } from './mail/mail.module';
import { PostModule } from './post/post.module';
import { VnpayModule } from './vnpay/vnpay.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role_permission/role_permission.module';
import { CoursesModule } from './courses/courses.module';
import { LessonModule } from './lesson/lesson.module';
import { SublessonModule } from './sublesson/sublesson.module';
import { CategoriesModule } from './categories/categories.module';
import { ProgressModule } from './progress/progress.module';

import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { OrdersModule } from './order/order.module';

@Module({
  imports: [
    MongodbConnect,
    UserModule,
    MailModule,
    PostModule,
    VnpayModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    CoursesModule,
    LessonModule,
    SublessonModule,
    CategoriesModule,
    ProgressModule,
    CloudinaryModule,
    OrdersModule
  ],
})
export class AppModule {}
