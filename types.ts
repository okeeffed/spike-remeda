export interface User {
  id: string;
  name: string;
}

export interface UserRecord extends User {
  searchableName: string;
}
