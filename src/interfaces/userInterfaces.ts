export interface UserData {
  id?: string
  username: string
  email: string
  password: string
}

export interface UserDataLogin {
  username: string
  password: string
}

export interface UserDataUpdate {
  username: string
  email: string
  password: string
}