import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardGamesListComponent } from './board-games-list/board-games-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BoardGamesService } from './board-games.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GetBoardGameComponent } from './get-board-game/get-board-game.component';
import { AddBoardGameComponent } from './add-board-game/add-board-game.component';
import { UpdateBoardGameComponent } from './update-board-game/update-board-game.component';
import { DeleteBoardGameComponent } from './delete-board-game/delete-board-game.component';

const routes: Routes = [
  { path: 'board-games-list', component: BoardGamesListComponent },
  { path: 'get-board-game', component: GetBoardGameComponent},
  { path: 'add-board-game', component: AddBoardGameComponent},
  { path: 'update-board-game', component: UpdateBoardGameComponent},
  { path: 'delete-board-game', component:DeleteBoardGameComponent}
]

@NgModule({
  declarations: [
    BoardGamesListComponent,
    GetBoardGameComponent,
    AddBoardGameComponent,
    UpdateBoardGameComponent,
    DeleteBoardGameComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [    // Here we write the Services for the specific module.
    BoardGamesService,
  ]
})
export class BoardGamesModule { }
