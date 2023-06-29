import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent {

  form: FormGroup;
  bookId: FormControl;
  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.

  constructor( private service: BookService) {
    this.bookId = new FormControl();
    this.form = new FormGroup({
      bookId: this.bookId
    });
   }
   
   onSubmit(): void {
    if (this.form.valid) {
      console.log("Starting API call 'delete book'.");
      this.loading = true;
      const bookId = this.bookId.value;
      console.log(bookId);
      this.service.removeBook(bookId).subscribe((response: any) => {
        window.alert("Book was successfully deleted.");
        this.loading = false;
        this.form.reset();
      },
      (error) => {
        window.alert("An error occurred during the book deletion.");
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
