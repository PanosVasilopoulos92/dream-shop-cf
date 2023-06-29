import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VideoGamesService } from '../video-games.service';

@Component({
  selector: 'app-delete-video-game',
  templateUrl: './delete-video-game.component.html',
  styleUrls: ['./delete-video-game.component.css']
})
export class DeleteVideoGameComponent {

  form: FormGroup;
  videoGameId: FormControl;
  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.

  constructor( private service: VideoGamesService) {
    this.videoGameId = new FormControl();
    this.form = new FormGroup({
      videoGameId: this.videoGameId
    });
   }

   onSubmit(): void {
    if (this.form.valid) {
      console.log("Starting Api call 'register user'.");
      this.loading = true;
      const videoGameId = this.videoGameId.value;
      this.service.removeVideoGame(videoGameId).subscribe((response) => {
      console.log(response);
      this.loading = false;
      window.alert("Video game with ID: " + videoGameId + " was succefully deleted.")
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
