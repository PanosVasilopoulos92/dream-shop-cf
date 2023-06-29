export interface BoardGame {
    id: number;
    title: string;
    numberOfPlayers: string;
    description: string;
    price: number;
    manufacturer: string;
    publishedYear: number;
}

export interface DisplayBoardGamesAPIList {
    status: boolean;
    data: BoardGame[];
}