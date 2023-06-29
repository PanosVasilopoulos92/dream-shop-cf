import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoardGame, DisplayBoardGamesAPIList } from './board-games-interfaces';
import { delay } from 'rxjs';

const BOARD_GAME_API = 'http://localhost:8080/api'

@Injectable()
export class BoardGamesService {

  private sharedData: any;

  constructor(private http: HttpClient) { }

  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }

  findAvailableBoardGames() {
    return this.http.get<DisplayBoardGamesAPIList>(`${BOARD_GAME_API}/board-games/findAll`);
  }

  findBoardGame(boardGameId: number) {
    return this.http.get<BoardGame>(`${BOARD_GAME_API}/board-games/findOne/${boardGameId}`);
  }

  findBoardGamesByTitle(title: string) {
    return this.http.get<DisplayBoardGamesAPIList>(`${BOARD_GAME_API}/board-games/find/title`, { params: { title } });
  }

  findBoardGamesByPriceRange(price1: number, price2: number) {
    return this.http.get<DisplayBoardGamesAPIList>(`${BOARD_GAME_API}/board-games/find/price-range`, { params: { price1, price2 } });
  }

  findBoardGamesByPriceTag(price: number) {
    return this.http.get<DisplayBoardGamesAPIList>(`${BOARD_GAME_API}/board-games/find/price-tag`, { params: { price }});
  }

  findBoardGamesByManufacturer(manufacturer: string) {
    return this.http.get<DisplayBoardGamesAPIList>(`${BOARD_GAME_API}/board-games/find/manufacturer`, { params: { manufacturer }});
  }

  addBoardGameToUser(userId: any, boardGameId: number) {
    return this.http.post<any>(`${BOARD_GAME_API}/users/${userId}/board-games/add/${boardGameId}`, null);
  }

  addBoardGame(boardGame: BoardGame) {
    return this.http.post<BoardGame>(`${BOARD_GAME_API}/board-games/create`, boardGame).pipe(delay(2000));
  }

  updateBoardGame(boardGameId: any, boardGame: BoardGame) {
    return this.http.put<BoardGame>(`${BOARD_GAME_API}/board-games/update/${boardGameId}`, boardGame).pipe(delay(2000));
  }

  removeBoardGame(boardGameId: number) {
    return this.http.delete<BoardGame>(`${BOARD_GAME_API}/board-games/delete/${boardGameId}`).pipe(delay(2000));
  }
}
