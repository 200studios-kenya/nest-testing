import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { BlogModule } from './blog/blog.module';
import { ShoesModule } from './shoes/shoes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    PostsModule,
    BlogModule,
    ShoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
