import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { RegisterUser } from '../user-interfaces';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  form: FormGroup;
  loading: Boolean = false;    // True when the call to Backend is loading and false when it is not loading. In order to show a spinner when loading.

  constructor(private fb: FormBuilder, private service: UserService) {
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
      console.log("Starting Api call 'register user'.");
      this.loading = true;
      console.log(this.form.value);
      const user = this.form.value as RegisterUser;
      this.service.registerUser(user).subscribe((response) => {
      console.log(response);
      this.loading = false;
      window.alert("User successfully registered.");
      this.form.reset();
      });
    } else {
      console.log('Form is not valid');
      window.alert("Form is not valid.");
      this.loading = false;
      this.form.reset();
    }
  }
}
