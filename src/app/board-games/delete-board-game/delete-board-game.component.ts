import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BoardGamesService } from '../board-games.service';

@Component({
  selector: 'app-delete-board-game',
  templateUrl: './delete-board-game.component.html',
  styleUrls: ['./delete-board-game.component.css']
})
export class DeleteBoardGameComponent {

  form: FormGroup;
  boardGameId: FormControl;
  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.

  constructor( private service: BoardGamesService) {
    this.boardGameId = new FormControl();
    this.form = new FormGroup({
      boardGameId: this.boardGameId
    });
   }

   onSubmit(): void {
    if (this.form.valid) {
      console.log("Starting Api call 'register user'.");
      this.loading = true;
      const boardGameId = this.boardGameId.value;
      console.log(boardGameId);
      this.service.removeBoardGame(boardGameId).subscribe((response) => {
      console.log(response);
      this.loading = false;
      window.alert("Book was succefully removed.")
      this.form.reset();
      },
      (error) => {
        window.alert("An error occurred during the video game deletion.");
        this.loading = false;
        console.error(error);
      }
      );
    } else {
      this.loading = false;
      window.alert("Form is not valid.")
    }
  }
}
