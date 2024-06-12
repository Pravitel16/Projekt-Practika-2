import axios from 'axios';
import React from 'react';

const SignUpForm = ({ onSignUp }) => {
  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/useremail/register', {
        email,
        password
      });
      if (response.status === 201) {
        onSignUp(email);
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUpForm;