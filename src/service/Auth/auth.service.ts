import { HttpException, HttpStatus, Injectable ,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../models/User';
import * as bcrypt from 'bcrypt';
import { UserParams } from '../../utils/types';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }




  async validateUserByPassword(loginDto) {

    let name = loginDto.username.toLowerCase()


    const user = await this.authRepository.findOne({ where: { username: name } });
    const validp = await bcrypt.compare(loginDto.password,user.password) ;


    if (user &&  validp == true) {

        let payload = { sub: user.id, username: user.username };
        const access_token = await this.jwtService.signAsync(payload);
      return { token: access_token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }


}