import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { UserService } from '../user.service';
import { RegisterUser } from '../user-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  form: FormGroup;
  userId: any = this.loginService.userId$;
  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.

  constructor(private fb: FormBuilder, private router: Router, private service: UserService, private loginService: LoginService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]]
    });
   }

  onSubmit(): void {
    if (this.form.valid) {
      this.loginService.userId$.subscribe(userId => {
      this.userId = userId;
    });
      console.log("Starting Api call 'register user'.");
      this.loading = true;
      const userId = this.userId;
      console.log(this.userId);
      const user = this.form.value as RegisterUser;
      this.service.updateUser(userId, user).subscribe((response) => {
      console.log(response);
      this.loading = false;
      window.alert("User was successfully updated.");
      this.loginService.logout();
      this.router.navigate(['']);
      },
      (error) => {
        window.alert("An error occurred during user's update.");
        this.loading = false;
        console.error(error);
      }
      );
    } else {
      console.log('Form is not valid');
      window.alert("Form is not valid.")
      this.loading = false;
    }
  }
}
