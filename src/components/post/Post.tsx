import React, { useState } from 'react'
import { Comment } from '../comment'
import styles from './Post.module.scss'
import { CustomRedirect } from '../custom-redirect'
import { PostProps, SingleComment } from '../../constants/interfaces'
import HelloComponent from '../hoc/helloComponent/HelloComponent'
import useFetch from '../../hooks/useFetch/useFetch'
import { axiosRoutes } from '../../constants/constants'
import { ToggleCommentsButton } from '../button/toggle-comment'

const Post = ({
  title,
  body,
  id,
  userName,
  showUnderline = false
}: PostProps): JSX.Element => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const { data: comments } = useFetch<SingleComment[]>(
    `${axiosRoutes.comments.COMMENTS}${id}`
  )

  const handleToggleComments = () => {
    setShowComments((prevState) => !prevState)
  }

  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1)

  return (
    <div className={styles.postCard} key={id}>
      <CustomRedirect to={`/post/${id}`} className='postLink'>
        <div className={styles.header}>
          <h2 className={showUnderline ? styles.underline : ''}>
            {capitalizedTitle}
          </h2>
        </div>
      </CustomRedirect>

      <div className={styles.name}>
        <h4>Username: {userName}</h4>
      </div>
      <div className={styles.content}>
        <p>{body}</p>
      </div>

      <ToggleCommentsButton
        showComments={showComments}
        handleToggleComments={handleToggleComments}
      />

      {showComments && (
        <div className={styles.comment}>
          <h3>Comments:</h3>
          {comments?.map((comment) => (
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

export default HelloComponent(Post)
