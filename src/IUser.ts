import * as e from 'express';

export interface IUser {

  id: number
  isAdmin(): boolean
}

export interface IUserRequest extends e.Request {
  user: IUser
}
