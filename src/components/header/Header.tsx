import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch/useFetch';
import axios from 'axios';
import styles from './Header.module.scss'

interface User {
  id: number;
  username: string;
}

interface Post {
  id: number;
  text: string;
  userId: number;
}

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps): JSX.Element => {
    const [newPostTitle, setNewPostTitle] = useState<string>(''); // State for post title
    const [newPostText, setNewPostText] = useState<string>(''); // State for post body
    const { data: posts, setData: setPosts } = useFetch<Post[]>('/api/posts');
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
  
    useEffect(() => {
      fetchPosts();
    }, []);
  
    const fetchPosts = () => {
      axios
        .get<Post[]>('/api/posts')
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    };
  
    const createPost = () => {
      axios
        .post('/api/posts', { title: newPostTitle, text: newPostText, userId: user?.id })
        .then(() => {
          setNewPostTitle(''); // Clear the title input field
          setNewPostText(''); // Clear the text input field
          fetchPosts();
        })
        .catch((error) => {
          console.error('Error creating post:', error);
        });
    };
  
    const editPost = (postId: number, newText: string) => {
      axios
        .put(`/api/posts/${postId}`, { text: newText })
        .then(() => {
          setEditingPostId(null);
          fetchPosts();
        })
        .catch((error) => {
          console.error('Error editing post:', error);
        });
    };
  
    const deletePost = (postId: number) => {
      axios
        .delete(`/api/posts/${postId}`)
        .then(() => {
          fetchPosts();
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
        });
    };
  
    return (
      <div className={styles['header-container']}>
        {user ? (
          <div className={styles['user-info']}>
            <p>Welcome, {user.username}!</p>
            <form onSubmit={createPost}>
            <input
              className={styles['post-title-input']}
              type="text"
              placeholder="Enter post title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <textarea
              className={styles['post-textarea']}
              placeholder="Write your post..."
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            <button className={styles['create-post-button']} type="submit">
              Create Post
            </button>
          </form>
            <button className={styles['logout-button']}>
            Log Out
          </button>
          </div>
      ) : (
        <p>Please log in to create posts.</p>
      )}
 <div className={styles['posts-section']}>
      <ul>
        {posts?.map((post) => (
           <li key={post.id} className={styles['post']}>
            {editingPostId === post.id ? (
              <div>
                <textarea
                  value={post.text}
                  onChange={(e) => editPost(post.id, e.target.value)}
                />
                <button onClick={() => setEditingPostId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{post.text}</p>
                {user && user.id === post.userId && (
                  <div>
                    <button onClick={() => setEditingPostId(post.id)}>Edit</button>
                    <button onClick={() => deletePost(post.id)}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Header;
