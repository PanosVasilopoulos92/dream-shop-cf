import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VideoGamesComponent } from './video-games/video-games.component';
import { BoardGamesComponent } from './board-games/board-games.component';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule)
  },
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'video-games', component: VideoGamesComponent},
  {path: 'board-games', component: BoardGamesComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    VideoGamesComponent,
    BoardGamesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    UserModule,
    BookModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
