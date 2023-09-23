import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CommentProps } from '../../constants/interfaces';
import HelloComponent from '../hoc/helloComponent/HelloComponent';
import styles from './Comment.module.scss';
import { RootState } from '../../reduxStore/store';


const Comment = ({ name, body, email}: CommentProps): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [commentText, setCommentText] = useState(body);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleDelete = () => {
    console.log('Delete')
  };
  

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.comment}>
      <h4 className={styles.name}>Name: {name}</h4>
      <p className={styles.email}>Email: {email}</p>
      {isEditing ? (
        <>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className={styles.textarea}
          />
          <button className={styles.saveButton}  onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p className={styles.body}>{commentText}</p>
          {user && (
            <div className={styles.commentButtonsContainer}>
              <button className={styles.commentButton} onClick={handleEdit}>Edit</button>
              <button className={styles.commentButton} onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HelloComponent(Comment);
