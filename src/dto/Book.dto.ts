import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsJSON, IsNotEmpty,} from 'class-validator'


export class  BookDto {

    @ApiProperty({
        description: 'Enter Book Title',
        example: "The book"
      })
      @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Enter Author Name',
        example: "Samuel"
      })
      @IsNotEmpty()
    author: string;

    @ApiProperty({
        description: 'Enter ISBN',
        example: "978-0-596-52068-7"
      })
      @IsNotEmpty()
      ISBN: string;

      @ApiProperty({
        description: 'Enter Publication Date',
        example: "2009-05-12"
      })
      @IsNotEmpty()
      publicationDate:Date ;
}


  
