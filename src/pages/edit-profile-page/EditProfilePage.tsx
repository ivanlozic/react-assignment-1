import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxStore/store";
import { User } from "../../constants/interfaces";
import styles from './EditProfilePage.module.scss';

const EditProfilePage = () => {
  const user: User | null = useSelector((state: RootState) => state.auth.user);

  return (
    <div className={styles.container}>
      <h1>Edit Profile</h1>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
           className={styles.input}
            type="text"
            id="name"
            name="name"
            value={user ? user.name : ""}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
           className={styles.input}
            type="text"
            id="email"
            name="email"
            value={user ? user.email : ""}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
           className={styles.input}
            type="text"
            id="username"
            name="username"
            value={user ? user.username : ""}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="street">Street</label>
          <input
           className={styles.input}
            type="text"
            id="street"
            name="street"
            value={user && user.address ? user.address.street : ""}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="suite">Suite</label>
          <input
           className={styles.input}
            type="text"
            id="suite"
            name="suite"
            value={user && user.address ? user.address.suite : ""}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="city">City</label>
          <input
           className={styles.input}
            type="text"
            id="city"
            name="city"
            value={user && user.address ? user.address.city : ""}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="zipcode">Zip Code</label>
          <input
           className={styles.input}
            type="text"
            id="zipcode"
            name="zipcode"
            value={user && user.address ? user.address.zipcode : ""}
          />
        </div>

        <div className={styles.formGroup}>
          <button type="submit" className={styles.button}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
