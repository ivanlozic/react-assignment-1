import { useCallback, useEffect, useState } from 'react'
import Post from '../../components/post/Post'
import styles from './PostPage.module.scss'
import HelloComponent from '../../components/helloComponent/HelloComponent'
import Pagination from '../../components/pagination/Pagination'
import { SinglePost, User } from '../../constants/interfaces'
import { postsURL, usersURL } from '../../constants/constants'
import useFetch from '../../hooks/useFetch/useFetch'

const PostsPage = (): JSX.Element => {
  const [filter, setFilter] = useState<string>('')
  const [filteredPosts, setFilteredPosts] = useState<SinglePost[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const postsPerPage = 10
  const { data: posts } = useFetch<SinglePost[]>(postsURL)
  const { data: users } = useFetch<User[]>(usersURL)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalFilteredPosts = filteredPosts.length

  const getUserName = useCallback(
    (userId: number) => {
      const user = users?.find((user) => user.id === userId)
      return user ? user.name : ''
    },
    [users]
  )

  useEffect(() => {
    if (posts) {
      const filtered = posts.filter((post) =>
        getUserName(post.userId)
          .toLowerCase()
          .includes(filter?.toLowerCase()?.trim())
      )
      setFilteredPosts(filtered)
      setTotalPages(Math.ceil(filtered.length / postsPerPage))
    }
  }, [posts, filter, users, getUserName])

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  const handlePageChange = (currentPage: number) => {
    if (currentPage < 1 || currentPage > totalPages) {
      return
    }
    setCurrentPage(currentPage)
  }
  const currentPostsMap = posts ? (
    currentPosts.map((post) => (
      <Post
        key={post.id}
        title={post.title}
        id={post.id}
        body={post.body}
        userId={post.userId}
        userName={getUserName(post.userId)}
        showUnderline={true} 
      />
    ))
  ) : (
    <p>No response</p>
  )

  return (
    <div className={styles.postPage}>
      <h1>Posts Page</h1>

      <input
        type='text'
        placeholder='Filter posts by username'
        value={filter}
        onChange={handleFilterChange}
      />
      {currentPostsMap}

      {totalFilteredPosts > postsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default HelloComponent(PostsPage)
