import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../models/Book';
import { BookParams } from '../../utils/types';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';




@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private httpService: HttpService


  ) { }

  async findBooks(userid) {
    return await this.bookRepository.find({ where: { user_id: userid } });
  }

  async createBook(bookDetails: BookParams, userid) {

    let name = bookDetails.title.toLowerCase()
    bookDetails.title= bookDetails.title.toLowerCase()

    const checkname = await this.bookRepository.findOne({ where: { title: name } });

   console.log( checkname)

    if (checkname != null )  {
      throw new HttpException(`Book already exist `, HttpStatus.NOT_IMPLEMENTED)

    }

    const newBook = await this.bookRepository.create({
      ...bookDetails,
      user_id: userid,
    });
    return await this.bookRepository.save(newBook);


  }


  async updateBook(userid, book_id: number, updateBookDetails: BookParams) {

    const check = await this.bookRepository.findOne({ where: { book_id: book_id } });



    if (check == null) {
      throw new HttpException(`Book does not exist `, HttpStatus.NOT_IMPLEMENTED)

    }


    const checkbook = await this.bookRepository.findOne({ where: { user_id: userid, book_id: book_id } });

    if (checkbook == null) {
      throw new HttpException(`You  dont have access to this Book `, HttpStatus.NOT_IMPLEMENTED)

    }

    this.bookRepository.update({ book_id }, { ...updateBookDetails })
    throw new HttpException('Book has been updated', HttpStatus.OK)
  }

  deleteBook(book_id: number) {
    this.bookRepository.delete({ book_id });
    throw new HttpException('Book has been deleted', HttpStatus.OK)
  }

  async getbookbyISBN(isbn) {
    let url = `https://openlibrary.org/isbn/${isbn}.json`;
     

    return await this.httpService.get(url).pipe(
     
      map(response => {

            // Process the response from the Open Library API
            const data = response.data;
            // Extract relevant information and return
       
          return data
          }),
      catchError(error => {
        // Handle network errors here
        console.error('Network error:', error.message);
        throw new HttpException(`Unable to find the book please try again later `, HttpStatus.NOT_IMPLEMENTED)
      }),
    );
  }

}
