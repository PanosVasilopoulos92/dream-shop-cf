import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { DisplayUser, DisplayUsersAPIList, RegisterUser } from './user-interfaces';

const USER_API = 'http://localhost:8080/api'

@Injectable()
export class UserService {

  private sharedData: any;

  constructor(private http: HttpClient) {}

  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }

  findAll() {
    return this.http.get<DisplayUsersAPIList>(`${USER_API}/users/findAll`);
  }

  findUserByUsername(username: any) {
    return this.http.get<DisplayUsersAPIList>(`${USER_API}/users/findOne/${username}`,);
  }

  findUsersByLastname(lastname: string) {
    return this.http.get<DisplayUsersAPIList>(`${USER_API}/users/find/lastname`, { params: { lastname } });
  }

  registerUser(user: RegisterUser) {
    return this.http.post<RegisterUser>(`${USER_API}/users/register`, user).pipe(delay(1000));
  }

  updateUser(userId: number, user: RegisterUser) {
    return this.http.put<DisplayUser>(`${USER_API}/users/update/${userId}`, user).pipe(delay(1000));
  }

  updateUserRole(userId: number, role: any) {
    console.log(role);
    return this.http.put(`${USER_API}/users/${userId}/${role}`, null).pipe(delay(1000));
  }

  deleteUser(username: string) {
    return this.http.delete(`${USER_API}/users/delete/${username}`).pipe(delay(1000));
  }

}
