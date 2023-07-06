export interface SinglePost {
  userId: number
  id: number
  title: string
  body: string
}

export interface User {
  id: number
  name: string
}

export interface SingleComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface PostProps {
  userId: number
  id: number
  title: string
  body: string
  userName: string
  showUnderline?: boolean
}

export interface CommentProps {
  name: string
  body: string
  email: string
}

export interface ToggleCommentsButtonProps {
  showComments: boolean
  handleToggleComments: () => void
}

export interface PaginationButtonProps {
  onClick: () => void
  disabled: boolean
  children: React.ReactNode
}
