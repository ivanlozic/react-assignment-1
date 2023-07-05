import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PostsPage from './pages/postsPage/PostsPage'
import SinglePostPage from './pages/singlePostPage/SinglePostPage'
import { createBrowserHistory } from '@remix-run/router'
import PageNotFound from './pages/404/PageNotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PostsPage />
  },
  {
    path: '/posts',
    element: <PostsPage />
  },
  {
    path: '/post/:id',
    element: <SinglePostPage />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const AppWithInitialRoute = () => {
  const history = createBrowserHistory()

  useEffect(() => {
    history.push('/posts')
  }, [history])

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

root.render(<AppWithInitialRoute />)
