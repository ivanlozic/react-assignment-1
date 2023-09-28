import React, { useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../../constants/interfaces';
import styles from './EditProfilePage.module.scss';
import { RootState } from '../../reduxStore/reducers/index';
import { CustomRedirect } from '../../components/custom-redirect';
import { userUpdated } from '../../reduxStore/reducers/updateUserReducer';

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const user: User | null = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState<string>(user ? user.name : '');
  const [email, setEmail] = useState<string>(user ? user.email : '');
  const [username, setUsername] = useState<string>(user ? user.username : '');
  const [street, setStreet] = useState<string>(
    user && user.address ? user.address.street : ''
  );
  const [suite, setSuite] = useState<string>(
    user && user.address ? user.address.suite : ''
  );
  const [city, setCity] = useState<string>(
    user && user.address ? user.address.city : ''
  );
  const [zipcode, setZipcode] = useState<string>(
    user && user.address ? user.address.zipcode : ''
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const editedUser: User = {
      ...user,
      id: user?.id || 0,
      name,
      email,
      username,
      address: {
        street,
        suite,
        city,
        zipcode,
      },
    };

    dispatch(userUpdated(editedUser));
  };

  return (
    <div className={styles.container}>
      <CustomRedirect to="/posts">
        <button className={styles.backButton}>Back to Home Page</button>
      </CustomRedirect>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="street">Street</label>
          <input
            className={styles.input}
            type="text"
            id="street"
            name="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="suite">Suite</label>
          <input
            className={styles.input}
            type="text"
            id="suite"
            name="suite"
            value={suite}
            onChange={(e) => setSuite(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="city">City</label>
          <input
            className={styles.input}
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="zipcode">Zip Code</label>
          <input
            className={styles.input}
            type="text"
            id="zipcode"
            name="zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <button type="submit" className={styles.button}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
