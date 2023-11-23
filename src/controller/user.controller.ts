import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put ,UsePipes, ValidationPipe,Res} from '@nestjs/common';
import { UserDto } from '../dto/User.dto';
import { UsersService ,} from '../service/user/users.service';
import {   AuthService} from '../service/auth/auth.service';
import { ApiHeader, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService, private readonly authService: AuthService) { }


   
    @Get('list')
    @ApiTags('List User')

    getUsers() {

        return this.userService.findUsers();
    }

    @Post('add')
    @ApiTags('Add User')
    @UsePipes(ValidationPipe)
    createUser(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto);
    }

    @Put('update/:id')
    @ApiTags('Update User')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UserDto,
    ) {
     return   await this.userService.updateUser(id, updateUserDto)
    }

    @Delete('delete/:id')
    @ApiTags('Delete User')
    async deleteUserById(
        @Param('id', ParseIntPipe) id: number,

    ) {
      return  await this.userService.deleteUser(id)
    }


    @Post('login')
    @ApiTags('User Login')
    @UsePipes(ValidationPipe)
    async login(@Body() loginDto: UserDto ,@Res() response: Response) {
    const logi= await this.authService.validateUserByPassword(loginDto);
    return response.status(200).json({
        status: 'success',
        message: 'Logged in suuccesfully',
        data: logi,
      });
    
    }


}