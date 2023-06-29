import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { VideoGamesModule } from './video-games/video-games.module';
import { BoardGamesModule } from './board-games/board-games.module';
import { AppService } from './app.service';
import { AuthInterceptor } from './auth-interseptor';
import { LoginService } from './login/login.service';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule)
  },
    {
    path: 'video-games',
    loadChildren: () => import('./video-games/video-games.module').then((m) => m.VideoGamesModule)
  },
     {
    path: 'board-games',
    loadChildren: () => import('./board-games/board-games.module').then((m) => m.BoardGamesModule)
  },
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent }
];

export function appInitializer(loginService: LoginService) {
  return () => {
    const authToken = loginService.getAuthToken();
    console.log(authToken);
    if (authToken) {
      loginService.setAuthToken(authToken);
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    UserModule,
    BookModule,
    VideoGamesModule,
    BoardGamesModule,
    FontAwesomeModule,
  ],
  providers: [
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
     LoginService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [LoginService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
