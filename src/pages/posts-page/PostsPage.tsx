import React from 'react';
import { useEffect, useState } from 'react';
import Post from '../../components/post/Post';
import styles from './PostPage.module.scss';
import HelloComponent from '../../components/hoc/helloComponent/HelloComponent';
import Pagination from '../../components/pagination/Pagination';
import { SinglePost } from '../../constants/interfaces';
import { axiosRoutes } from '../../constants/constants';
import useFetch from '../../hooks/useFetch/useFetch';
import useUser from '../../hooks/useUser/useUser';
import { Spinner } from '../../components/spinner';
import { LoginForm } from '../../components/login-form';
import { Header } from '../../layout/header';
import { useSelector } from 'react-redux';
import { RootState } from '../../reduxStore/store';

const PostsPage = (): JSX.Element => {
  const [filter, setFilter] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<SinglePost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const { data: posts } = useFetch<SinglePost[]>(axiosRoutes.posts.POSTS);
  const { getUserName } = useUser();

  const user = useSelector((state: RootState) => state.auth.user);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalFilteredPosts = filteredPosts.length;

  useEffect(() => {
    if (posts) {
      const filtered = posts.filter((post) =>
        getUserName(post.userId)
          .toLowerCase()
          .includes(filter?.toLowerCase()?.trim())
      );
      setFilteredPosts(filtered);
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
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
      <div className={styles.header}>
        {user ? <Header user={user} /> : <LoginForm />}
      </div>
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
          />
        ))
      ) : (
        <Spinner />
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
