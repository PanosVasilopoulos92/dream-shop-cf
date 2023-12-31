export interface UserBookList {
    id: number;
    title: string;
    author: string;
    publishedYear: number;
}

export interface UserBoardGamesList {
    id: number;
    title: string;
    numberOfPlayers: string;
    description : string;
    price: number;
    manufacturer: string;
    publishedYear: number;
}

export interface UserVideoGamesList {
    id: number;
    title: string;
    genre: string;
    description : string;
    price: number;
    manufacturer: string;
    publishedYear: number;
}

export interface DisplayUser {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
    imgUrl: string;
    books: UserBookList[];
    boardGames: UserBoardGamesList[];
    videoGames: UserVideoGamesList[];
}

export interface RegisterUser {
    username: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
    imgUrl: string;
}

export interface UserAPIRegisterUser {
    status: boolean;
    data: RegisterUser;
}

export interface DisplayUsersAPIList {
    status: boolean;
    data: DisplayUser[];
}

export interface UserAPIUserOne {
    status: boolean;
    data: DisplayUser;
}