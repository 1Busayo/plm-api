import { Module } from '@nestjs/common';
import { UsersController} from './controller/user.controller';
import { UsersService } from './service/user/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/User';
import { Book } from './models/Book';
import { JwtModule } from '@nestjs/jwt'
import { BookController } from './controller/book.controller';
import { BookService } from './service/book/book.service';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './service/auth/auth.service';




@Module({

  imports: [TypeOrmModule.forFeature([User,Book]),
              HttpModule,
            JwtModule.register({
            global: true,
            secret: 'secretkey123',
            signOptions: { expiresIn: '30m' },
          })

 ],
  controllers: [UsersController,BookController],
  providers: [UsersService,BookService,AuthService]
})
export class PlModule {}
