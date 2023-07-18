import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PostsPage } from './pages/posts-page';
import { SinglePostPage } from './pages/single-post-page';
import { createBrowserHistory } from '@remix-run/router';
import { PageNotFound } from './pages/404';
const App = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <PostsPage />,
    },
    {
      path: '/posts',
      element: <PostsPage />,
    },
    {
      path: '/post/:id',
      element: <SinglePostPage />,
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);
  const history = createBrowserHistory();

  useEffect(() => {
    history.push('/posts');
  }, [history]);

  return (
    <div>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
};

export default App;
