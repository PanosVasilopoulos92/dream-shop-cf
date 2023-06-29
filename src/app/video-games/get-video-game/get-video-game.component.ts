import { Component } from '@angular/core';
import { VideoGame } from '../video-games-interfaces';
import { Subscription } from 'rxjs';
import { VideoGamesService } from '../video-games.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-get-video-game',
  templateUrl: './get-video-game.component.html',
  styleUrls: ['./get-video-game.component.css']
})
export class GetVideoGameComponent {

  constructor(private videoGameService: VideoGamesService, private router: Router, private loginService: LoginService) {}

  receivedData = this.videoGameService.getData();
  
  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.
  videoGame?: VideoGame
  subscription: Subscription | undefined;
  userId: number | null = null;

  ngOnInit() {
    // Subscribe to Observable in order to retrieve it's value.
    this.loginService.userId$.subscribe(userId => {
      this.userId = userId;
    });
    console.log("Starting Api call 'findall'.");
    this.loading = true;
    console.log(this.receivedData);
    this.subscription = this.videoGameService.findVideoGame(this.receivedData).subscribe({
      next: (apiData: VideoGame) => {      // What I do with the data that I received.
        console.log(apiData);
        this.videoGame = apiData;
      },
      error: (error: any) => {      // If an error occures.
        this.loading = false;
        console.log(error)
      },    
      complete: () => {
        this.loading = false;
        console.log("Api call completed with success.")
      },
    })
  }

   buyVideoGame(videoGameId: number): void {
    console.log("Api call has started.");
    this.videoGameService.addVideoGameToUser(this.userId, videoGameId).subscribe({
      next: (apiData: any) => {
        console.log("BookId added: ", videoGameId);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        window.alert("Only logged in users can make purchases.")
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.");
        this.router.navigate(['video-games-list']);
        window.alert("Video game was successfully added.")
      }
    });
  }

}
