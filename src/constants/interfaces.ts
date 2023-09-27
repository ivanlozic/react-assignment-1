export interface BaseProps {
  userId: number;
  id: number;
  body: string;
}

export interface SinglePost extends BaseProps {
  title: string;
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
  onDelete?: (commentId: number) => void;
}

export interface PostProps extends SinglePost {
  userName: string;
  showUnderline?: boolean;
}

export type CommentProps = SingleComment;

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
