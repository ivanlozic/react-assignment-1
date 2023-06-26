import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Post from '../components/Post'
import HelloComponent from '../components/HelloComponent'

interface SinglePost {
  userId: number
  id: number
  title: string
  body: string
  userName:string
}

const SinglePostPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<SinglePost | null>(null)
  HelloComponent('Hello from', 'SinglePostPage')
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
    }

    fetchPost()
  }, [id])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className='singlePostPage'>
      <h1>Single Post Page - ID: {id}</h1>
      <Post
        title={post.title}
        id={post.id}
        body={post.body}
        userId={post.userId}
        userName={post.userName}
      />

      <Link to='/posts'>
        <button>Go to Posts</button>
      </Link>
    </div>
  )
}

export default SinglePostPage
