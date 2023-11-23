import { Module ,NestModule ,MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlModule } from './plm.module';
import { User } from './models/User'
import { Book } from './models/Book'
import { ConfigModule } from '@nestjs/config';
import { PlMiddleware } from './middleware/middleware';


@Module({
  imports: [

  ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
    type:'postgres',
    host: process.env.HOST,
    port: parseInt(process.env.DBPORT,10),
    username: process.env.USERNAME,
    ssl:true,
    password:process.env.PASSWORD,
    database: process.env.DBNAME,
    entities:[User,Book],
    synchronize:true,
  }),
  PlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
  consumer .apply(PlMiddleware)
    .exclude(
    { path: 'users/add', method: RequestMethod.POST },
    { path: 'users/login', method: RequestMethod.POST }

).forRoutes({path: '*', method: RequestMethod.ALL })
  }

}
