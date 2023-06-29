export interface AuthenticateUser {
    id: number;
    username: string;
    role: string;
    token: string;
    expiresIn: number;
    imgUrl: string;
}

export interface UserAPILoginUser {
    status: boolean;
    data: AuthenticateUser;
}

export interface LoginResponse {
    id: number;
    token: string;
    expiresIn: number;
    username: string;
    role: string;
    userAvatarImg: string;
}