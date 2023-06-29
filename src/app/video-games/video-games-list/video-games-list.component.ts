import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoGamesService } from '../video-games.service';
import { VideoGame } from '../video-games-interfaces';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-video-games-list',
  templateUrl: './video-games-list.component.html',
  styleUrls: ['./video-games-list.component.css']
})
export class VideoGamesListComponent implements OnInit, OnDestroy {

  searchTitleInput: string = '';
  selectedOption: string | undefined;
  manufacturer: string = '';
  priceLessThan: number = 0;
  price1: number = 0;
  price2: number = 0;
  userRole: any = this.loginService.userRole$;

  constructor(private videoGameService: VideoGamesService, private loginService: LoginService) {}

  loading = false;
  videoGamesList: VideoGame[] = [];
  subscription: Subscription | undefined;

  ngOnInit(): void {
    // Subscribe to Observable in order to retrieve it's value.
    this.loginService.userRole$.subscribe(userRole => {
      this.userRole = userRole;
      console.log(this.userRole);
    });
    console.log("Api call has started.");
    this.loading = true;
    this.subscription = this.videoGameService.findAll().subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.videoGamesList = apiData; // Assign the array directly
      },
      error: (error) => {
        console.log(error);
      },
      complete: ()=> {
        console.log("Api call has been completed.")
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();     // '?' if not undefined make unsubscribe.
  }

  searchByTitle(): void {
    console.log("Api call has started.");
    this.videoGameService.findVideoGamesByTitle(this.searchTitleInput).subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.videoGamesList = apiData; // Assign the array directly
      },
      error: (error) => {
        console.log(error);
        this.videoGamesList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        console.log("Api call has been completed.")
      }
    })
  }

  searchByPriceRange(): void {
    console.log("Api call has started.");
    this.videoGameService.findVideoGamesByPriceRange(this.price1, this.price2).subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.videoGamesList = apiData; // Assign the array directly
      },
      error: (error) => {
        console.log(error);
        this.videoGamesList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        console.log("Api call has been completed.")
      }
    })
  }

  searchByPriceTag(): void {
    console.log("Api call has started.");
    this.videoGameService.findVideoGamesByPriceTag(this.priceLessThan).subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.videoGamesList = apiData; // Assign the array directly
      },
      error: (error) => {
        console.log(error);
        this.videoGamesList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        console.log("Api call has been completed.")
      }
    })
  }
  
  searchByManufacturer(): void {
    console.log("Api call has started.");
    this.videoGameService.findVideoGamesByManufacturer(this.manufacturer).subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.videoGamesList = apiData; // Assign the array directly
      },
      error: (error) => {
        console.log(error);
        this.videoGamesList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        console.log("Api call has been completed.")
      }
    })
  }

  sendData(videoGameId: number) {
    const dataToSend = videoGameId;
    this.videoGameService.setData(dataToSend);
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
