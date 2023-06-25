import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthenticateUser } from './login-interface';
import { AppService } from '../app.service';
import { UserService } from '../user/user.service';
import { DisplayUser } from '../user/get-user/user-interface';


const USER_API = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'    // Every Injectable is a Service that i can use everywhere i want if it is: "providedIn: 'root'".
})
export class LoginService {

  // First Observable.
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();    // When i have an Observable i put a '$' at the end of it's name.

  // Second Observable.
  private loggedInUserFullnameSubject = new BehaviorSubject<string>('');
  loggedInUserFullname$ = this.loggedInUserFullnameSubject.asObservable();

  // Adds a new BehaviorSubject to store the username.
  private usernameSubject = new BehaviorSubject<string>('');
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient, private alertService: AppService, private userService: UserService) {}   // Here we inject the Services.

  login(credentials: any) {
    this.http.post<AuthenticateUser>(`${USER_API}/login`, credentials)
    .subscribe((user) => {
      if (user) {
        this.loggedInSubject.next(user.username === credentials.username);
        this.loggedInUserFullnameSubject.next(`${user.username} ${user.token} ${user.expiresIn} ${user.role}`);
        // Emit the username value to the usernameSubject.
        this.usernameSubject.next(user.username);
        console.log("Ok.");
        console.log(this.isLoggedIn$);
        console.log(this.loggedInUserFullname$);
        console.log(this.loggedInSubject);
        console.log(this.loggedInUserFullnameSubject);
        console.log(user.username, user.token, user.expiresIn, user.role);
        console.log(this.username$);
      } else {
        this.alertService.newAlert({type: 'danger', heading: 'Authentication error.', text: 'Wrong username or password.'});
        console.log("Wrong credentials");
      }
    });
  }

  logout() {
    this.loggedInSubject.next(false);
    this.loggedInUserFullnameSubject.next('');
    this.usernameSubject.next('');  // Clears the username value.
  }
}
