import React, { useState,FormEvent, useEffect } from 'react'
import styles from './LoginForm.module.scss'
import HelloComponent from '../hoc/helloComponent/HelloComponent'
import { Link } from 'react-router-dom'
import { loginUser } from '../../reduxStore/authSlice'
import { useDispatch } from "react-redux";
import axios from 'axios'
import { User } from '../../constants/interfaces'

const LoginForm = () => {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('');
  const [usersData, setUsersData] = useState<User[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsersData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);

    const matchingUser = usersData.find(user => user.name === username)

    console.log(matchingUser)


    if (matchingUser && matchingUser.name === password) {
      dispatch(loginUser(matchingUser));
      console.log('Login successful');
    } else {
      console.error('Login failed');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value= {password.toString()} 
    
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit' className={styles.button}>Log In</button>
      <Link to='/register'><button className={styles.button}>Sign up</button></Link>
    </form>
  )
}

export default HelloComponent(LoginForm)
