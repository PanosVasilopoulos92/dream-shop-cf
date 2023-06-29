import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BookService } from './book.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { GetBookComponent } from './get-book/get-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';

const routes: Routes = [
  { path: 'book-list', component: BookListComponent },
  { path: 'get-book', component:GetBookComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'delete-book', component: DeleteBookComponent},
  { path: 'update-book', component: UpdateBookComponent}
];

@NgModule({
  declarations: [
    BookListComponent,
    GetBookComponent,
    AddBookComponent,
    DeleteBookComponent,
    UpdateBookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [    // Here we write the Services for the specific module.
    BookService,
  ]
})
export class BookModule { }
