import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put ,UsePipes, ValidationPipe,Req,Res} from '@nestjs/common';
import { BookDto } from '../dto/Book.dto';
import { BookService } from '../service/book/book.service';
import { ApiHeader, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';


@ApiBearerAuth()
@Controller('book')
export class BookController {
    constructor(private bookService: BookService) { }


    @Get('list')
    @ApiTags('List Book')
  async  getUsers(@Req() req , @Res() response: Response) {
        const userid =req.userID;
        const booklist = await this.bookService.findBooks(userid);
        return response.status(200).json({
            status: 'success',
            message: 'List of books',
            data: booklist,
          });

    }
ß
    @Post('add')
    @ApiTags('Add Book')
    @UsePipes(ValidationPipe)
   async createUser(@Body() bookDto: BookDto , @Req() req,  @Res() response: Response) {

        const userid =req.userID;
        const addbook = await this.bookService.createBook(bookDto,userid);
        return response.status(200).json({
            status: 'success',
            message: 'Book has been added',
            data: addbook,
          });
    }

    @Put('update/:id')
    @ApiTags('Update Book')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() bookDto: BookDto,
        @Req() req,
        @Res() response: Response
    ) {
        const userid =req.userID;
       const upbook = await this.bookService.updateBook(userid,id, bookDto)
        return response.status(200).json({
            status: 'success',
            message: 'Book has been updated',
            data: upbook,
          });
    }

    @Delete('delete/:id')
    @ApiTags('Delete Book')
    async deleteBookById(
        @Param('id', ParseIntPipe) id: number,
        @Res() response: Response
    ) {
        await this.bookService.deleteBook(id)

        return response.status(200).json({
            status: 'success',
            message: 'Book has been deleted',
          });
    }

    @Get('openapi/:id')
    @ApiTags('Open Librarys API , get book by ISBN')
   async getbookbyISBN( @Param('id', ParseIntPipe) isbn: number ) {
        return this.bookService.getbookbyISBN(isbn);
    }

}