import React, { useEffect, useState } from 'react'
import Comment from '../comment/Comment'
import styles from './Post.module.scss'
import CustomRedirect from '../customRedirect/customRedirect'

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
  userName: string
}

const Post = ({
  title,
  body,
  id,
  userId,
  userName
}: PostProps): JSX.Element => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [comments, setComments] = useState<SingleComment[]>([])

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
    <div className={styles.postCard} key={id}>
      <CustomRedirect to={`/post/${id}`} className='postLink'>
        <div className={styles.header}>
          <h2>{title}</h2>
        </div>
      </CustomRedirect>

      <div className={styles.name}>
        <h4>Username: {userName}</h4>
      </div>
      <div className={styles.content}>
        <p>{body}</p>
      </div>

      <button onClick={handleToggleComments}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <div className={styles.comment}>
          <h3>Comments:</h3>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              name={comment.name}
              email={comment.email}
              body={comment.body}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Post
