import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { LoginService } from 'src/app/login/login.service';
import { Subscription } from 'rxjs';
import { DisplayUser } from '../user-interfaces';

@Component({
  selector: 'app-get-users-list',
  templateUrl: './get-users-list.component.html',
  styleUrls: ['./get-users-list.component.css']
})
export class GetUsersListComponent implements OnInit, OnDestroy {

  lastnameInput: string = '';
  usernameInput: string = '';
  selectedOption: string | undefined;

  constructor(private userService: UserService, private loginService: LoginService) {}

  loading = false;
  usersList: DisplayUser[] = [];
  subscription: Subscription | undefined;
  userRole: any = this.loginService.userRole$;

  ngOnInit(): void {
    // Subscribe to Observable in order to retrieve it's value.
    this.loginService.userRole$.subscribe(userRole => {
      this.userRole = userRole;
      console.log(this.userRole);
    });
    console.log("Api call has started.");
    this.subscription = this.userService.findAll().subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.usersList = apiData; // Assign the array directly
      console.log(this.usersList);
      },
      error: (error) => {
        console.log(error);
        this.usersList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        console.log("Api call has been completed.")
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();     // '?' if not undefined make unsubscribe.
  }

  searchByLastname(): void {
    console.log("Api call has started.");
    this.userService.findUsersByLastname(this.lastnameInput).subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.usersList = apiData; // Assign the array directly
      },
      error: (error) => {
        console.log(error);
        this.usersList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.")
      }
    })
  }

  searchByUsername(): void {
    console.log("Api call has started.");
    this.userService.findUserByUsername(this.usernameInput).subscribe({
      next: (apiData: any) => {
      console.log(apiData);
      this.usersList = apiData; // Assign the array directly
      console.log(this.usersList.length);
      },
      error: (error) => {
        console.log(error);
        this.usersList = [];
        this.showAlert("Wrong input, nothing to show.");
      },
      complete: ()=> {
        console.log("Api call has been completed.")
      }
    })
  }

  sendData(username: string) {
    const dataToSend = username;
    this.userService.setData(dataToSend);
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
