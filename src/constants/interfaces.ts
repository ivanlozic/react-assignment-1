export interface SinglePost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}
export interface SingleComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  userName: string;
  showUnderline?: boolean;
  comments: SingleComment[];
}

export interface CommentProps {
  name: string;
  body: string;
  email: string;
  postId: number;
  id: number;
}

export interface ToggleCommentsButtonProps {
  showComments: boolean;
  handleToggleComments: () => void;
}

export interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

export interface routerType {
  path: string;
  element: JSX.Element;
}
