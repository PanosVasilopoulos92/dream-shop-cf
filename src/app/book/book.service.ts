import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, DisplayBooksAPIList } from './book-interfaces';
import { delay } from 'rxjs';

const BOOK_API = 'http://localhost:8080/api'

@Injectable()
export class BookService {

  private sharedData: any;

  constructor(private http: HttpClient) {}

  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }

  findAll() {
  return this.http.get<DisplayBooksAPIList>(`${BOOK_API}/books/findAll`);
  }

  findBooksByTitle(title: string) {
    return this.http.get<DisplayBooksAPIList>(`${BOOK_API}/books/find/title`, { params: { title } });
  }

  findBooksByPriceRange(price1: number, price2: number) {
    return this.http.get<DisplayBooksAPIList>(`${BOOK_API}/books/find/price-range`, { params: { price1, price2 } });
  }

  findBooksByPriceTAg(price: number) {
    return this.http.get<DisplayBooksAPIList>(`${BOOK_API}/books/find/price-tag`, { params: { price }});
  }

  findBooksByAuthor(author: string) {
    return this.http.get<DisplayBooksAPIList>(`${BOOK_API}/books/find/author`, { params: { author }});
  }

  addBookToUser(userId: any, bookId: number) {
    return this.http.post<any>(`http://localhost:8080/api/users/${userId}/books/add/${bookId}`, null);
  }

  findBook(bookId: number) {
    return this.http.get<Book>(`${BOOK_API}/books/findOne/${bookId}`);
  }

  addBook(book: Book) {
    return this.http.post<Book>(`${BOOK_API}/books/create`, book).pipe(delay(1000));
  }

  removeBook(bookId: number) {
    return this.http.delete<Book>(`http://localhost:8080/api/books/delete/${bookId}`).pipe(delay(1000));
  }

  updateBook(bookId: any, book: Book) {
    return this.http.put<Book>(`${BOOK_API}/books/update/${bookId}`, book).pipe(delay(1000));
  }
}
