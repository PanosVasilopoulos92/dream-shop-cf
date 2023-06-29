import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book-interfaces';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {

  form: FormGroup;
  bookId?: number;
  loading: Boolean = false;   // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.

  constructor(private fb: FormBuilder, private service: BookService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.min(2)]],
      publishedYear: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
   }

  onSubmit(): void {
    if (this.form.valid) {
      console.log("Starting API call 'update book'.");
      this.loading = true;
      console.log(this.form.value);
      const bookId = this.bookId;
      const book = this.form.value as Book;
      this.service.updateBook(bookId, book).subscribe((response: any) => {
        window.alert("Book was successfully updated.");
        this.loading = false;
        this.form.reset();
      },
      (error) => {
        window.alert("An error occurred during the book update.");
        this.loading = false;
        console.error(error);
      }
      );
    } else {
      this.loading = false;
      window.alert("Form is not valid.");
    }
  }
}
