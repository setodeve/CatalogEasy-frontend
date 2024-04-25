export type UserData = {
  is_login: boolean
  data: {
    allow_password_change: boolean
    created_at: string
    email: string
    id: number
    image: string | null
    name: string
    nickname: string | null
    provider: string
    uid: string
    updated_at: string
  }
}

export type UserErrorData = {
  message: string
  is_login: boolean
}
