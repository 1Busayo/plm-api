import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsJSON, IsNotEmpty,} from 'class-validator'


export class UserDto {

    @ApiProperty({
        description: 'Enter username',
        example: "samuel"
      })
      @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'Enter password',
        example: "****"
      })
      @IsNotEmpty()
     password: string;
}