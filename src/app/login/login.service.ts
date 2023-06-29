import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthenticateUser } from './login-interface';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

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

  // Adds a new BehaviorSubject to store the user's Id.
  private idSubject = new BehaviorSubject<number>(0);
  userId$ = this.idSubject.asObservable();

  private roleSubject = new BehaviorSubject<string>('');
  userRole$ = this.roleSubject.asObservable();

  private imgSubject = new BehaviorSubject<string>('');
  userAvatarImg$ = this.imgSubject.asObservable();

  private authToken: string | null = null;
  authTokenSubject = new Subject<string | null>();

  constructor(private http: HttpClient, private router: Router, private appService: AppService) {
    
  }

  login(credentials: any) {
    this.http.post<AuthenticateUser>(`${USER_API}/login`, credentials)
    .subscribe((user) => {
      if (user) {
        this.loggedInSubject.next(true);
        this.loggedInUserFullnameSubject.next(`${user.id} ${user.username} ${user.token} ${user.expiresIn} ${user.role} ${user.imgUrl}`);
        // Emit the username value to the usernameSubject.
        this.usernameSubject.next(user.username);
        this.idSubject.next(user.id);
        this.roleSubject.next(user.role);
        this.imgSubject.next(user.imgUrl);
        this.authTokenSubject.next(user.token);
        this.setAuthToken(user.token);
        console.log(this.authToken);
        console.log("Succefull login.");
      } else {
        this.appService.newAlert({type: 'danger', heading: 'Authentication error.', text: 'Wrong username or password.'});
        console.log("Wrong credentials");
        this.router.navigate(['']);
      }
    });
  }

  logout() {
    this.loggedInSubject.next(false);
    this.loggedInUserFullnameSubject.next('');
    this.usernameSubject.next('');  // Clears the username value.
    this.idSubject.next(0);
    this.roleSubject.next('');
    this.imgSubject.next('');
    this.authTokenSubject.next('');
    this.clearAuthToken();
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authToken', token); // Store the token in local storage
    this.authTokenSubject.next(token); // Notify the token update
  }

  getAuthToken(): string | null {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('authToken'); // Retrieve the token from local storage
    }
    return this.authToken;
  }

  clearAuthToken(): void {
    this.authToken = null;
    localStorage.removeItem('authToken'); // Remove the token from local storage
    this.authTokenSubject.next(null);
  }
}
