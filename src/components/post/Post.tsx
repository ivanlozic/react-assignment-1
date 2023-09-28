import React, { useEffect, useState } from 'react';
import { Comment } from '../comment';
import styles from './Post.module.scss';
import { CustomRedirect } from '../custom-redirect';
import { PostProps, SingleComment } from '../../constants/interfaces';
import HelloComponent from '../hoc/helloComponent/HelloComponent';
import { ToggleCommentsButton } from '../button/toggle-comment';
import { useSelector } from 'react-redux';
import { axiosRoutes } from '../../constants/constants';
import { axiosInstance } from '../../config/axios';
import { RootState } from '../../reduxStore/store';
import CustomModal from '../customModal/CustomModal';

const Post = ({
  title,
  body,
  id,
  userName,
  showUnderline = false,
}: PostProps): JSX.Element => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [editedBody, setEditedBody] = useState<string>(body);
  const [isCreateCommentOpen, setIsCreateCommentOpen] =
    useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [postComments, setPostComments] = useState<SingleComment[]>([]);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);

  const isCurrentUserAuthor = user?.name === userName;
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  const openCustomModal = () => {
    setEditedBody(body);
    setIsCustomModalOpen(true);
  };

  const closeCustomModal = () => {
    setIsCustomModalOpen(false);
  };

  const fetchCommentsForPost = async (id: number) => {
    try {
      const response = await axiosInstance.get(
        `${axiosRoutes.comments.COMMENTS}${id}`
      );
      const comments = response.data;
      setPostComments(comments);
    } catch (err) {
      console.error('Error fetching comments:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchCommentsForPost(id);
  }, []);

  const handleDeleteComment = (commentId: number) => {
    const updatedComments = postComments.filter(
      (comment) => comment.id !== commentId
    );
    setPostComments(updatedComments);
  };

  const handleToggleComments = () => {
    setShowComments((prevState) => !prevState);
  };

  const handleCloseEditModal = () => {
    setIsCustomModalOpen(false);
  };

  const handleOpenCreateComment = () => {
    setIsCreateCommentOpen(!isCreateCommentOpen);
  };
  const handleCreateComment = () => {
    if (newComment.trim() === '') {
      return;
    }

    const newCommentObj: SingleComment = {
      postId: id,
      id: postComments.length + 1,
      name: user?.name || 'Anonymous',
      email: user?.email || '',
      body: newComment,
    };

    postComments.push(newCommentObj);

    setNewComment('');

    setIsCreateCommentOpen(false);
  };

  const handleEditPost = () => {
    const updatedPostData = {
      id,
      title,
      userName,
      postComments,
      body: editedBody,
    };

    axiosInstance
      .put(`${axiosRoutes.posts.POSTS}/${id}`, updatedPostData)
      .then((response) => {
        console.log('Post updated successfully', response.data);
        setIsCustomModalOpen(false);
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
          alert('Post deleted successfully');
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
          <button onClick={openCustomModal}>Edit Post</button>
          <button onClick={handleDeletePost}>Delete Post</button>
        </div>
      )}

      {showComments && (
        <div className={styles.comment}>
          {postComments.length === 0 ? (
            <p>No comments available.</p>
          ) : (
            <>
              <h3>Comments:</h3>
              {postComments?.map((comment: SingleComment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  postId={id}
                  name={comment.name}
                  email={comment.email}
                  body={comment.body}
                  onDelete={handleDeleteComment}
                />
              ))}
            </>
          )}

          <button onClick={handleOpenCreateComment}>Add Comment</button>
        </div>
      )}

      {showComments && isCreateCommentOpen && (
        <div className={styles.commentInputContainer}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleCreateComment}>Add Comment</button>
        </div>
      )}

      <CustomModal isOpen={isCustomModalOpen} onRequestClose={closeCustomModal}>
        <h2 className={styles.modalTitles}>Edit Post</h2>
        <textarea
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
          className={styles.modalTextarea}
        />
        <div className={styles.modalButtons}>
          <button onClick={handleEditPost} className={styles.modalButtonOk}>
            OK
          </button>
          <button
            onClick={handleCloseEditModal}
            className={styles.modalButtonCancel}
          >
            Cancel
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default HelloComponent(Post);
