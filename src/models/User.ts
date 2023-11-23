
import { Entity, Column, PrimaryGeneratedColumn, OneToMany,Timestamp } from 'typeorm';
import { Book } from "./Book";


@Entity({ name: 'users_tbl'})
export class User {
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ default:  Timestamp })
    createdAt: Date;

   
  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}

