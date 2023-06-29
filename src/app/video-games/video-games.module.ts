import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoGamesListComponent } from './video-games-list/video-games-list.component';
import { RouterModule, Routes } from '@angular/router';
import { VideoGamesService } from './video-games.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { GetVideoGameComponent } from './get-video-game/get-video-game.component';
import { AddVideoGameComponent } from './add-video-game/add-video-game.component';
import { UpdateVideoGameComponent } from './update-video-game/update-video-game.component';
import { DeleteVideoGameComponent } from './delete-video-game/delete-video-game.component';

const routes: Routes = [
  { path: 'video-games-list', component: VideoGamesListComponent },
  { path: 'get-video-game', component:GetVideoGameComponent },
  { path: 'add-video-game', component: AddVideoGameComponent},
  { path: 'update-video-game', component: UpdateVideoGameComponent},
  { path: 'delete-video-game', component: DeleteVideoGameComponent}
];

@NgModule({
  declarations: [
    VideoGamesListComponent,
    GetVideoGameComponent,
    AddVideoGameComponent,
    UpdateVideoGameComponent,
    DeleteVideoGameComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [    // Here we write the Services for the specific module.
    VideoGamesService,
  ]
})
export class VideoGamesModule { }
