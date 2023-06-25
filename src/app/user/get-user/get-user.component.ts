import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DisplayUser, DisplayUsersAPIList } from './user-interface';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit, OnDestroy {

  @Input() username: string | undefined;

  constructor (private userService: UserService, private service: LoginService) {}

  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.
  user?: DisplayUser;
  subscription: Subscription | undefined;

  ngOnInit(): void {
    console.log("Starting Api call 'findUser'.");
    this.service.username$.subscribe((username) => {
      if (username) {
        this.username = username;
        this.fetchUser();
      }
    });
  }

  fetchUser(): void {
    console.log("Starting API call 'findUser'.");
    console.log(this.username);
    this.subscription = this.userService.findOne(this.username).subscribe({
      next: (apiData: DisplayUser) => {
        console.log(apiData);
        this.user = apiData;
      },
      error: (error: any) => {
        this.loading = false;
        console.log(error);
      },
      complete: () => {
        this.loading = false;
        console.log("API call completed with success.");
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  
}
