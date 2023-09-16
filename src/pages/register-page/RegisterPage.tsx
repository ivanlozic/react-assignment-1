import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './RegisterPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import HelloComponent from '../../components/hoc/helloComponent/HelloComponent';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMatchError, setPasswordMatchError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }
    alert('User registered successfully');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h1>Create Account</h1>
      <Link to="/" className={styles.backButton}>
        Back to Home Page
      </Link>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {passwordMatchError && (
            <p className={styles.errorMessage}>{passwordMatchError}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default HelloComponent(RegisterPage);
