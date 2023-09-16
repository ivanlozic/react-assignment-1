import React from 'react';
import { PostsPage } from '../pages/posts-page';
import { SinglePostPage } from '../pages/single-post-page';
import { PageNotFound } from '../pages/404';
import { RegisterPage } from '../pages/register-page';
import { EditProfilePage } from '../pages/edit-profile-page';

const Routes = {
  ROOT: '/',
  POSTS: '/posts',
  SINGLE_POST: '/post/:id',
  REGISTER: '/register',
  EDIT_PROFILE: 'editProfile',
  NOT_FOUND: '*',
};

const routesList = [
  {
    path: Routes.ROOT,
    element: <PostsPage />,
  },
  {
    path: Routes.POSTS,
    element: <PostsPage />,
  },
  {
    path: Routes.SINGLE_POST,
    element: <SinglePostPage />,
  },
  {
    path: Routes.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: Routes.EDIT_PROFILE,
    element: <EditProfilePage />,
  },
  {
    path: Routes.NOT_FOUND,
    element: <PageNotFound />,
  },
];

export default routesList;
