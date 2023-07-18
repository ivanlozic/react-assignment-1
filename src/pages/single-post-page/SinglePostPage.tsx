import { useParams } from 'react-router-dom'
import { Post } from '../../components/post'
import styles from './SinglePostPage.module.scss'
import { SinglePost } from '../../constants/interfaces'
import HelloComponent from '../../components/hoc/helloComponent/HelloComponent'
import { axiosRoutes } from '../../constants/constants'
import useFetch from '../../hooks/useFetch/useFetch'
import { CustomRedirect } from '../../components/custom-redirect'
import useUser from '../../hooks/useUser/useUser'

const SinglePostPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const { data: post } = useFetch<SinglePost>(
    `${axiosRoutes.posts.POSTS}/${id}`
  )
  const { getUserName } = useUser()

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
