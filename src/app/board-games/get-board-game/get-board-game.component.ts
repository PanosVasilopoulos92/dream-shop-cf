import { Component } from '@angular/core';
import { BoardGamesService } from '../board-games.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { BoardGame } from '../board-games-interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-get-board-game',
  templateUrl: './get-board-game.component.html',
  styleUrls: ['./get-board-game.component.css']
})
export class GetBoardGameComponent {

  constructor(private boardGameService: BoardGamesService, private router: Router, private loginService: LoginService) {}

  receivedData = this.boardGameService.getData();
  
  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.
  boardGame?: BoardGame;
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
    this.subscription = this.boardGameService.findBoardGame(this.receivedData).subscribe({
      next: (apiData: BoardGame) => {      // What I do with the data that I received.
        console.log(apiData);
        this.boardGame = apiData;
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

   buyBoardGame(boardGameId: number): void {
    console.log("Api call has started.");
    this.boardGameService.addBoardGameToUser(this.userId, boardGameId).subscribe({
      next: () => {
        console.log("Book with ID:", boardGameId, "added to user with ID:", this.userId);
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        window.alert("Only logged in users can make purchases.")
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.");
        this.router.navigate(['board-games-list']);
        window.alert("Board game was successfully added.")
      }
    });
  }
}
