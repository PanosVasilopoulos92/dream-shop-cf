import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { DisplayUser } from '../user-interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-user-page',
  templateUrl: './manage-user-page.component.html',
  styleUrls: ['./manage-user-page.component.css']
})
export class ManageUserPageComponent {

  receivedData = this.userService.getData();
  // userAvatarImg: any = this.loginService.userAvatarImg$;
  userAvatarImg: any = '';
  userId: any;
  selectedUserRole: string = '';

  constructor(private userService: UserService, private router: Router, private loginService: LoginService) {}
  
  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.
  user?: DisplayUser;
  subscription: Subscription | undefined;
  
  ngOnInit() {
    // Subscribe to Observable in order to retrieve it's value.
    // this.loginService.userAvatarImg$.subscribe((userAvatarImg) => {
    //     this.userAvatarImg = userAvatarImg;
    //     console.log(userAvatarImg);
    // });
    console.log("Starting Api call 'findall'.");
    this.loading = true;
    console.log(this.receivedData);
    this.subscription = this.userService.findUserByUsername(this.receivedData).subscribe({
      next: (apiData: any) => {      // What I do with the data that I received.
        console.log(apiData);
        this.user = apiData;
        this.userAvatarImg = this.user?.imgUrl;
        this.userId = this.user?.id;
        console.log(this.userAvatarImg);
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

  deleteUser(username: string): void {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      console.log("Api call has started.");
    this.userService.deleteUser(this.receivedData).subscribe({
      next: () => {
        console.log("User " + username + " was successfully deleted." );
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.");
        this.router.navigate(['get-users-list']);
        window.alert("User " + username + " was successfully deleted.")
      }
    });
    } else {
    console.log('Delete canceled');
  }
}

  updateRole(userId: any): void {
    console.log("Api call has started.");
    console.log(this.selectedUserRole);
      this.userService.updateUserRole(userId, this.selectedUserRole).subscribe({
      next: () => {
        console.log("User has changed role.")
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
      complete: ()=> {
        this.loading = false;
        console.log("Api call has been completed.");
        window.alert("User has successfully changed role.")
      }
    });
  }
}
