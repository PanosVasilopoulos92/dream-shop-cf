import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoGamesService } from '../video-games.service';
import { VideoGame } from '../video-games-interfaces';

@Component({
  selector: 'app-update-video-game',
  templateUrl: './update-video-game.component.html',
  styleUrls: ['./update-video-game.component.css']
})
export class UpdateVideoGameComponent {

  form: FormGroup;
  videoGameId?: number;
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
      console.log("Starting API call 'update book'.");
      this.loading = true;
      const videoGameId = this.videoGameId;
      const videoGame = this.form.value as VideoGame;
      this.service.updateVideoGame(videoGameId, videoGame).subscribe((response) => {
      window.alert("Video game was successfully updated.");
        this.loading = false;
        this.form.reset();
      },
      (error) => {
        window.alert("An error occurred during the video game update.");
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
