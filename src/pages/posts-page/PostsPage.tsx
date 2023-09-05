import React from 'react';
import { useEffect, useState } from 'react';
import Post from '../../components/post/Post';
import styles from './PostPage.module.scss';
import HelloComponent from '../../components/hoc/helloComponent/HelloComponent';
import Pagination from '../../components/pagination/Pagination';
import { SingleComment, SinglePost } from '../../constants/interfaces';
import { axiosRoutes } from '../../constants/constants';
import useFetch from '../../hooks/useFetch/useFetch';
import useUser from '../../hooks/useUser/useUser';
import { axiosInstance } from '../../config/axios';

const PostsPage = (): JSX.Element => {
  const [filter, setFilter] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<SinglePost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const { data: posts } = useFetch<SinglePost[]>(axiosRoutes.posts.POSTS);
  const { getUserName } = useUser();
  const [comments, setComments] = useState<{ [key: number]: SingleComment[] }>(
    {}
  );
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalFilteredPosts = filteredPosts.length;
  
  const fetchCommentsForPost = async (id: number): Promise<SingleComment[]> => {
    try {
      const response = await axiosInstance.get(
        `${axiosRoutes.comments.COMMENTS}${id}`
      );
      const comments = response.data;
      return comments;
    } catch (err) {
      console.error('Error fetching comments:', err);
      return [];
    }
  };

  useEffect(() => {
    if (posts) {
      const filtered = posts.filter((post) =>
        getUserName(post.userId)
          .toLowerCase()
          .includes(filter?.toLowerCase()?.trim())
      );
      setFilteredPosts(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));

      const fetchComments = async () => {
        const commentsData: { [key: number]: SingleComment[] } = {};
        const promises = posts.map(async (post) => {
          try {
            const comments = await fetchCommentsForPost(post.id);
            commentsData[post.id] = comments;
          } catch (error) {
            console.error('Error fetching comments:', error);
            commentsData[post.id] = [];
          }
        });

        await Promise.all(promises);
        setComments(commentsData);
      };
      fetchComments();
    }
  }, [posts, filter, getUserName]);


  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.postPage}>
      <h1>Posts Page</h1>

      <input
        type="text"
        placeholder="Filter posts by username"
        value={filter}
        onChange={handleFilterChange}
      />

      {posts ? (
        currentPosts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            id={post.id}
            body={post.body}
            userId={post.userId}
            userName={getUserName(post.userId)}
            showUnderline={true}
            comments={comments[post.id]}
          />
        ))
      ) : (
        <p>No response</p>
      )}

      {totalFilteredPosts > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HelloComponent(PostsPage);
