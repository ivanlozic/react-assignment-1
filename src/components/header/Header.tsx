import React, { useState } from 'react';
import axios from 'axios';
import styles from './Header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../constants/interfaces';
import { useDispatch } from "react-redux";
import { logoutUser } from '../../reduxStore/authSlice';
import { Link } from 'react-router-dom';


interface HeaderProps {
    user: User | null;
}

const Header = ({ user }: HeaderProps): JSX.Element => {
    const [newPostTitle, setNewPostTitle] = useState<string>('');
    const [newPostText, setNewPostText] = useState<string>('');
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [isCreatePostToggle, setCreatePostToggle] = useState<boolean>(false);

    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
        if(isCreatePostToggle){
            setCreatePostToggle(false)
        }
    };
    const createPostToggle = () => {
        setCreatePostToggle(!isCreatePostToggle);
    };

    const createPost = () => {
        axios
            .post('https://jsonplaceholder.typicode.com/posts', { title: newPostTitle, text: newPostText, userId: user?.id })
            .then(() => {
                setNewPostTitle('');
                setNewPostText('');
            })
            .catch((error) => {
                console.error('Error creating post:', error);
            });
    };


    const handleLogout = () => {
        dispatch(logoutUser());
      };

    return (
        <div className={styles['header-container']}>
            {user ? (
                <div className={styles['user-info']}>
                    <div className={styles['user-menu']} onClick={toggleDropdown}>
                        <span className={styles['user-text']} >Welcome, {user.name}!</span>
                        <FontAwesomeIcon icon={faUser} className={styles['user-icon']} />
                    </div>

                    {isDropdownOpen && (
                        <div className={styles['dropdown-menu']}>
                            <button className={styles['dropdown-button']} onClick={createPostToggle}>
                                Create Post
                            </button>
                         <Link to={'/editProfile'}><button className={styles['dropdown-button']}>Edit Profile</button></Link>   
                            <button className={styles['dropdown-button']} onClick={handleLogout}>Log Out</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Please log in to create posts.</p>
            )}

            {isCreatePostToggle && (
             <div className={styles['create-post-form']}>
             <form onSubmit={(e) => {
                 e.preventDefault();
                 createPost();
             }}>
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
         </div>
         
            )}
        </div>
    );
};

export default Header;
