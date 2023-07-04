import { useCallback, useEffect, useState } from 'react'
import Post from '../../components/post/Post'
import styles from './PostPage.module.scss'
import HelloComponent from '../../components/helloComponent/HelloComponent'

interface SinglePost {
  userId: number
  id: number
  title: string
  body: string
}

const PostsPage = (): JSX.Element => {
  const [posts, setPosts] = useState<SinglePost[]>([])
  const [filter, setFilter] = useState<string>('')
  const [filteredPosts, setFilteredPosts] = useState<SinglePost[]>([])
  const [users, setUsers] = useState<{ id: number; name: string }[]>([])

  const getUserName = useCallback(
    (userId: number) => {
      const user = users.find((user) => user.id === userId)
      return user ? user.name : ''
    },
    [users]
  )

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        )
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()

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
  }, [])

  useEffect(() => {
    const filtered = posts.filter((post) =>
      getUserName(post.userId)
        .toLowerCase()
        .includes(filter.toLowerCase().trim())
    )
    setFilteredPosts(filtered)
  }, [posts, filter, users, getUserName])

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  return (
    <div className={styles.postPage}>
      <h1>Posts Page</h1>

      <input
        type='text'
        placeholder='Filter posts by username'
        value={filter}
        onChange={handleFilterChange}
      />
      {filteredPosts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          id={post.id}
          body={post.body}
          userId={post.userId}
          userName={getUserName(post.userId)}
        />
      ))}
    </div>
  )
}

export default HelloComponent(PostsPage)
