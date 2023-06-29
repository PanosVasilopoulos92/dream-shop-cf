import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardGamesService } from '../board-games.service';
import { BoardGame } from '../board-games-interfaces';

@Component({
  selector: 'app-add-board-game',
  templateUrl: './add-board-game.component.html',
  styleUrls: ['./add-board-game.component.css']
})
export class AddBoardGameComponent {

  form: FormGroup;
  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.

  constructor(private fb: FormBuilder, private service: BoardGamesService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      manufacturer: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.min(2)]],
      numberOfPlayers: ['', [Validators.required, Validators.min(1)]],
      publishedYear: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
   }

   onSubmit(): void {
    if (this.form.valid) {
      console.log("Starting Api call 'add board game'.");
      this.loading = true;
      console.log(this.form.value);
      const boardGame = this.form.value as BoardGame;
      this.service.addBoardGame(boardGame).subscribe((response) => {
      console.log(response);
      this.loading = false;
      window.alert("Board game was succefully added.")
      this.form.reset();
      });
    } else {
      this.loading = false;
      window.alert("Form is not valid.")
    }
  }
}
