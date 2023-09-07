import React, { useState,FormEvent } from 'react'
import styles from './LoginForm.module.scss'
import HelloComponent from '../hoc/helloComponent/HelloComponent'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Log In</button>
      <Link to='/register' className={styles.button}>Sign up</Link>
    </form>
  )
}

export default HelloComponent(LoginForm)
