import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Post from '../../components/post/Post'
import styles from './SinglePostPage.module.scss'

interface SinglePost {
  userId: number
  id: number
  title: string
  body: string
  userName: string
}

const SinglePostPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<SinglePost | null>(null)
  const [users, setUsers] = useState<{ id: number; name: string }[]>([])

  const getUserName = useCallback(
    (userId: number) => {
      const user = users.find((user) => user.id === userId)
      return user ? user.name : ''
    },
    [users]
  )

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        )
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Error fetching post:', error)
      }

      const fetchUsers = async () => {
        try {
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
          )
          const data = await response.json()
          setUsers(data)
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      }

      fetchUsers()
    }

    fetchPost()
  }, [id])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.singlePostPage}>
      <h1>Single Post Page - ID: {id}</h1>
      <Post
        title={post.title}
        id={post.id}
        body={post.body}
        userId={post.userId}
        userName={getUserName(post.userId)}
      />

      <Link to='/posts'>
        <button>Go to Posts</button>
      </Link>
    </div>
  )
}

export default SinglePostPage
