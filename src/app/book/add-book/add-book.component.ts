import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../book-interfaces';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  form: FormGroup;

  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.

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
      console.log("Starting Api call 'register user'.");
      this.loading = true;
      console.log(this.form.value);
      const book = this.form.value as Book;
      this.service.addBook(book).subscribe((response) => {
      console.log(response);
      this.loading = false;
      window.alert("Book was succefully added.")
      this.form.reset();
      });
    } else {
      this.loading = false;
      window.alert("Form is not valid.")
    }
  }
}
