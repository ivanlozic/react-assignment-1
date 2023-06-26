import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import HelloComponent from './HelloComponent'

interface SingleComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

interface PostProps {
  userId: number
  id: number
  title: string
  body: string
  userName:string
}

const Post = ({ title, body, id, userId, userName }: PostProps): JSX.Element => {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<SingleComment[]>([])

  HelloComponent('Hello from', 'Post')

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${id}`
        )
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }



    if (showComments) {
      fetchComments()
    }

  }, [id, userId, showComments])

  const handleToggleComments = () => {
    setShowComments((prevState) => !prevState)
  }
  return (
    <div className='post-card' key={id}>
      <Link to={`/post/${id}`} className='postLink'>
        <div className='post-card__header'>
          <h2>{title}</h2>
        </div>
      </Link>

      <div className='post-card__name'>
        <h4>Username: {userName}</h4>
      </div>
      <div className='post-card__content'>
        <p>{body}</p>
      </div>

      <button onClick={handleToggleComments}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <div className='comments'>
          <h3>Comments:</h3>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              name={comment.name}
              email={comment.email}
              body={comment.body}
              postId={comment.postId}
              id={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Post
