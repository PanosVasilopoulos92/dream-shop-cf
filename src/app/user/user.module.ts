import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { GetUserComponent } from './get-user/get-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { GetUsersListComponent } from './get-users-list/get-users-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ManageUserPageComponent } from './manage-user-page/manage-user-page.component';

const routes: Routes = [
  { path: 'get-user', component: GetUserComponent },
  { path: 'register-user', component: RegisterUserComponent},
  { path: 'get-users-list', component: GetUsersListComponent},
  { path: 'update-user', component: UpdateUserComponent},
  { path: 'manage-user-page', component: ManageUserPageComponent}
];

@NgModule({
  declarations: [
    GetUserComponent,
    RegisterUserComponent,
    GetUsersListComponent,
    UpdateUserComponent,
    ManageUserPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [    // Here we write the Services for the specific module.
    UserService,
  ]
})
export class UserModule { }
