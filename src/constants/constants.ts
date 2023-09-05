export const HELLO_MESSAGE = 'Hello from ';

export const axiosRoutes = {
  posts: {
    POSTS: '/posts',
  },
  user: {
    USERS: '/users',
  },
  comments: {
    COMMENTS: '/comments?postId=',
  },
};

export const ovalSpinner = {
  height: 40,
  width: 40,
  color: 'black',
  ariaLabel: 'oval-loading',
  secondaryColor: 'grey',
  strokeWidth: 4,
  strokeWidthSecondary: 4
}
