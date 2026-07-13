export type AppUser = {
  id: string
  email: string | null
  first_name: string | null
  last_name: string | null
  username: string | null
  image_url: string | null
  role: 'user' | 'admin' | string
  created_at: string
  updated_at: string
}

export type Greeting = {
  message: string
  clerk_user_id: string
  username: string | null
  email: string | null
}

export type Note = {
  id: number
  user_id: string
  content: string
  created_at: string
}

export type Job = {
  id: number
  user_id: string
  kind: string
  status: string
  payload: Record<string, unknown> | null
  result: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export type Notification = {
  id: number
  user_id: string
  title: string
  body: string
  read_at: string | null
  created_at: string
}

export type StoredFile = {
  id: number
  user_id: string
  object_name: string
  filename: string
  content_type: string | null
  size_bytes: number | null
  public_url: string | null
  created_at: string
}
