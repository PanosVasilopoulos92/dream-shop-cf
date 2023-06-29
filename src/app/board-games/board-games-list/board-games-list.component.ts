import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardGamesService } from '../board-games.service';
import { LoginService } from 'src/app/login/login.service';
import { BoardGame } from '../board-games-interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-games-list',
  templateUrl: './board-games-list.component.html',
  styleUrls: ['./board-games-list.component.css']
})
export class BoardGamesListComponent implements OnInit, OnDestroy{

  searchTitleInput: string = '';
  selectedOption: string | undefined;
  priceLessThan: number = 0;
  manufacturer: string = '';
  price1: number = 0;
  price2: number = 0;

  constructor(private boardGameService: BoardGamesService, private loginService: LoginService) {}

  loading = false;
  boardGamesList: BoardGame[] = [];
  subscription: Subscription | undefined;
  userRole: any = this.loginService.userRole$;

  ngOnInit(): void {
    // Subscribe to Observable in order to retrieve it's value.
    this.loginService.userRole$.subscribe(userRole => {
      this.userRole = userRole;
      console.log(this.userRole);
    });
    console.log("Api call has started.");
    this.loading = true;
    this.subscription = this.boardGameService.findAvailableBoardGames().subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.boardGamesList = apiData; // Assign the array directly
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this.boardGamesList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.")
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();     // '?' if not undefined make unsubscribe.
  }

  searchByTitle(): void {
    console.log("Api call has started.");
    this.boardGameService.findBoardGamesByTitle(this.searchTitleInput).subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.boardGamesList = apiData; // Assign the array directly
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this.boardGamesList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.")
      }
    })
  }

  searchByPriceRange(): void {
    console.log("Api call has started.");
    this.boardGameService.findBoardGamesByPriceRange(this.price1, this.price2).subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.boardGamesList = apiData; // Assign the array directly
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this.boardGamesList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.")
      }
    })
  }

  searchByPriceTag(): void {
    console.log("Api call has started.");
    this.boardGameService.findBoardGamesByPriceTag(this.priceLessThan).subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.boardGamesList = apiData; // Assign the array directly
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this.boardGamesList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.")
      }
    })
  }
  
  searchByManufacturer(): void {
    console.log("Api call has started.");
    this.boardGameService.findBoardGamesByManufacturer(this.manufacturer).subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.boardGamesList = apiData; // Assign the array directly
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        this.boardGamesList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.")
      }
    })
  }

  sendData(boardGameId: number) {
    const dataToSend = boardGameId;
    this.boardGameService.setData(dataToSend);
  }

  onOptionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedOption = target.value;
    console.log(this.selectedOption);
  }

  showAlert(message: string): void {
    window.alert(message);
  }

}
