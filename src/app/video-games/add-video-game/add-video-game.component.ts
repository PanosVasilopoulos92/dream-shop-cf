import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoGamesService } from '../video-games.service';
import { VideoGame } from '../video-games-interfaces';

@Component({
  selector: 'app-add-video-game',
  templateUrl: './add-video-game.component.html',
  styleUrls: ['./add-video-game.component.css']
})
export class AddVideoGameComponent {

  form: FormGroup;
  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.

  constructor(private fb: FormBuilder, private service: VideoGamesService) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      manufacturer: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.min(2)]],
      genre: ['', [Validators.required, Validators.minLength(3)]],
      publishedYear: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
   }

   onSubmit(): void {
    if (this.form.valid) {
      console.log("Starting Api call 'add video game'.");
      this.loading = true;
      console.log(this.form.value);
      const videoGame = this.form.value as VideoGame;
      this.service.addVideoGame(videoGame).subscribe((response) => {
      console.log(response);
      this.loading = false;
      window.alert("Video game was succefully added.")
      this.form.reset();
      });
    } else {
      this.loading = false;
      window.alert("Form is not valid.")
    }
  }
}
