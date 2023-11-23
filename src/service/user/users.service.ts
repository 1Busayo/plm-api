import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../models/User';
import * as bcrypt from 'bcrypt';
import { UserParams } from '../../utils/types';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  findUsers() {
    return this.userRepository.find();
  }

  async createUser(userDetails: UserParams) {

    let usr = userDetails.username.toLowerCase()

    const checkname = await this.userRepository.findOne({ where: { username: usr } });



    if (checkname !== null) {
      throw new HttpException(`Username  already exist `, HttpStatus.NOT_IMPLEMENTED)

    }

    userDetails.password = await bcrypt.hash(userDetails.password, 10);

    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    const usersaved = await this.userRepository.save(newUser);

    let payload = { sub: usersaved.id, username: usersaved.username };

    const access_token = await this.jwtService.signAsync(payload);

    return { usersaved, token: access_token };

  }


  async updateUser(id: number, updateUserDetails: UserParams) {

    updateUserDetails.password = await bcrypt.hash(updateUserDetails.password, 10);

    this.userRepository.update({ id }, { ...updateUserDetails })
   throw new HttpException('User has been updated', HttpStatus.OK)

  }

  async deleteUser(id: number) {
    await this.userRepository.delete({ id });
    throw new HttpException('User has been deleted', HttpStatus.OK)
  }



}
