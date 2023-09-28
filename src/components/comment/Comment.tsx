import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CommentProps } from '../../constants/interfaces';
import HelloComponent from '../hoc/helloComponent/HelloComponent';
import styles from './Comment.module.scss';
import { RootState } from '../../reduxStore/reducers/index';

const Comment = ({
  id,
  name,
  body,
  email,
  onDelete,
}: CommentProps): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [commentText, setCommentText] = useState(body);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.comment}>
      <h4 className={styles.name}>Name: {name}</h4>
      {email && email.trim() !== '' && (
        <p className={styles.email}>Email: {email}</p>
      )}
      {isEditing ? (
        <>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className={styles.textarea}
          />
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </>
      ) : (
        <>
          <p className={styles.body}>{commentText}</p>
          {user?.email === email && (
            <div className={styles.commentButtonsContainer}>
              <button className={styles.commentButton} onClick={handleEdit}>
                Edit
              </button>
              <button className={styles.commentButton} onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HelloComponent(Comment);
