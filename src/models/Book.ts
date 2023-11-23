import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'books_tbl' })
export class Book {
  @PrimaryGeneratedColumn()
  book_id: number;
  
  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  ISBN: string;

  @Column({ type: 'date' })
  publicationDate: Date;

  @ManyToOne(() => User, user => user.books)
  @JoinColumn({ name: 'user_id' })
  user: User;
}