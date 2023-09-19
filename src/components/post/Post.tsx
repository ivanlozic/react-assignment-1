import React, { useState } from 'react';
import { Comment } from '../comment';
import styles from './Post.module.scss';
import { CustomRedirect } from '../custom-redirect';
import { PostProps, SingleComment } from '../../constants/interfaces';
import HelloComponent from '../hoc/helloComponent/HelloComponent';
import Modal from 'react-modal'
import { ToggleCommentsButton } from '../button/toggle-comment';
import { useSelector } from 'react-redux';
import { RootState } from '../../reduxStore/store';
import { axiosRoutes } from '../../constants/constants';
import { axiosInstance } from '../../config/axios';

const Post = ({
  title,
  body,
  id,
  userName,
  comments,
  showUnderline = false,
}: PostProps): JSX.Element => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editedBody, setEditedBody] = useState<string>(body);

  const isCurrentUserAuthor = user?.name === userName;
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  const handleToggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const handleOpenEditModal = () => {
    setEditedBody(body);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditPost = () => {
    
    const updatedPostData = {
      id, 
      title,
      userName,
      comments,
      body: editedBody, 
    };
  
    axiosInstance
      .put(`${axiosRoutes.posts.POSTS}/${id}` , updatedPostData)
      .then((response) => {
        console.log('Post updated successfully', response.data);
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error('Error updating post', error);
      });
  };

  const handleDeletePost = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axiosInstance
      .delete(`${axiosRoutes.posts.POSTS}/${id}`)
      .then((response) => {
        alert('Post deleted successfully')
        console.log('Post deleted successfully', response.data);
      })
      .catch((error) => {
        console.error('Error deleting post', error);
      });
    }
  };

  return (
    <div className={styles.postCard} key={id}>
      <CustomRedirect to={`/post/${id}`} className="postLink">
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

      {isCurrentUserAuthor && (
        <div className={styles.editDeleteButtons}>
          <button onClick={handleOpenEditModal}>Edit Post</button>
          <button onClick={handleDeletePost}>Delete Post</button>
        </div>
      )}
      {showComments && (
        <div className={styles.comment}>
          <h3>Comments:</h3>
          {comments?.map((comment: SingleComment) => (
            <Comment
              key={comment.id}
              id= {comment.id}
              postId= {id}
              name={comment.name}
              email={comment.email}
              body={comment.body}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseEditModal}
        contentLabel="Edit Post Modal"
      >
        <h2>Edit Post</h2>
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        />
        <div>
          <button onClick={handleEditPost}>OK</button>
          <button onClick={handleCloseEditModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default HelloComponent(Post);
