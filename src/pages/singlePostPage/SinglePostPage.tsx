import { useCallback} from 'react'
import { useParams } from 'react-router-dom'
import Post from '../../components/post/Post'
import styles from './SinglePostPage.module.scss'
import { SinglePost, User, } from '../../constants/interfaces'
import HelloComponent from '../../components/helloComponent/HelloComponent'
import { postsURL, usersURL } from '../../constants/constants'
import useFetch from '../../hooks/useFetch/useFetch'
import CustomRedirect from '../../components/customRedirect/customRedirect'


const SinglePostPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const { data: post } = useFetch<SinglePost>(`${postsURL}/${id}`)
  const { data: users } = useFetch<User[]>(usersURL)

  const getUserName = useCallback(
    (userId: number) => {
      const user = users?.find((user) => user.id === userId)
      return user ? user.name : ''
    },
    [users]
  )

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

      <CustomRedirect to='/posts'>
        <button>Go to Posts</button>
      </CustomRedirect>
    </div>
  )
}

export default HelloComponent(SinglePostPage)
