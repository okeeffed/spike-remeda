export type Success<T> = {
  success: true;
  data: T;
};

export type Failure = {
  success: false;
  error: Error;
};

export type Either<T> = Success<T> | Failure;

export interface User {
  id: string;
  name: string;
}

export interface UserRecord extends User {
  searchableName: string;
}
