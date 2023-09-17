import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './RegisterPage.module.scss';
import { Link } from 'react-router-dom';
import HelloComponent from '../../components/hoc/helloComponent/HelloComponent';
import { User } from '../../constants/interfaces';

const RegisterPage = () => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    name: '',
    email: '',
    username: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.address.street) {
      newErrors['address.street'] = 'Street is required';
    }
    if (!formData.address.suite) {
      newErrors['address.suite'] = 'Suite is required';
    }
    if (!formData.address.city) {
      newErrors['address.city'] = 'City is required';
    }
    if (!formData.address.zipcode) {
      newErrors['address.zipcode'] = 'Zipcode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const postData = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        username: formData.username,
        address: {
          street: formData.address.street,
          suite: formData.address.suite,
          city: formData.address.city,
          zipcode: formData.address.zipcode,
        },
      };
      
      console.log('Post Data:', postData);
      alert('User registered successfully');
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className={styles.container}>
      <h1>Create Account</h1>
      <Link to="/" className={styles.backButton}>
        Back to Home Page
      </Link>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Name"
            required
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="Email"
            required
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            placeholder="Username"
            required
          />
          {errors.username && (
            <p className={styles.errorMessage}>{errors.username}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            className={styles.input}
            placeholder="Street"
            required
          />
          {errors['address.street'] && (
            <p className={styles.errorMessage}>{errors['address.street']}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="suite"
            name="address.suite"
            value={formData.address.suite}
            onChange={handleChange}
            className={styles.input}
            placeholder="Suite"
            required
          />
          {errors['address.suite'] && (
            <p className={styles.errorMessage}>{errors['address.suite']}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className={styles.input}
            placeholder="City"
            required
          />
          {errors['address.city'] && (
            <p className={styles.errorMessage}>{errors['address.city']}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="zipcode"
            name="address.zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
            className={styles.input}
            placeholder="Zipcode"
            required
            inputMode="numeric"
            pattern="[0-9]*"
          />
          {errors['address.zipcode'] && (
            <p className={styles.errorMessage}>{errors['address.zipcode']}</p>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default HelloComponent(RegisterPage);
