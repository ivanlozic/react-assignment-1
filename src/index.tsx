import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PostsPage from './pages/postsPage/PostsPage'
import App from './App'
import SinglePostPage from './pages/singlePostPage/SinglePostPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/posts',
    element: <PostsPage />
  },
  {
    path: '/post/:id',
    element: <SinglePostPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
