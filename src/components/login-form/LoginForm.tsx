import React, { useState, FormEvent } from 'react';
import styles from './LoginForm.module.scss';
import HelloComponent from '../hoc/helloComponent/HelloComponent';
import { Link } from 'react-router-dom';
import { loginUser } from '../../reduxStore/reducers/authSlice';
import { useDispatch } from 'react-redux';
import { User } from '../../constants/interfaces';
import useFetch from '../../hooks/useFetch/useFetch';
import { axiosRoutes } from '../../constants/constants';

const LoginForm = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const { data: usersData } = useFetch<Array<User>>(axiosRoutes.user.USERS);

  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);

    const matchingUser = usersData?.find((user) => user.name === username);

    console.log(matchingUser);

    if (matchingUser && matchingUser.name === password) {
      dispatch(loginUser(matchingUser));
      console.log('Login successful');
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password.toString()}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Log In
        </button>
        <Link to="/register">
          <button className={styles.button}>Sign up</button>
        </Link>
      </form>
    </div>
  );
};

export default HelloComponent(LoginForm);
