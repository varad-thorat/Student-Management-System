import React, { useState } from 'react';
// import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
const SignUp = () => {
  const navigate = useNavigate(); // Create a navigate function using useNavigate

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signup successful
          console.log('Signup successful:', userCredential.user);
          // You can perform additional actions after signup, such as redirecting the user to a different page
        })
        .catch((error) => {
          setError(error.message);
        });
        navigate('/');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
