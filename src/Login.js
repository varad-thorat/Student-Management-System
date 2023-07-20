import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import NavBar from './NavBar';
import './Login.css';
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleadmin = (e) =>{
    if (!email || !password) {
      setError('Please enter email and password');
    }else if(email === 'admin@eg2.dev' && password === '123456'){
      navigate('/home')
    }else{
      setError('Wrong credentials');
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter email and password');
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // onLogin(); // Call the onLogin function from App.js to update the isLoggedIn state
          navigate('/home'); // Redirect to home page after successful login
        })
        .catch((error) => {
          setError('Wrong credentials');
        });
    }
  };

  return (
    <div className='container'>
      <h2>Feedback Application</h2>
      <form>
        <div className='email'>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='password'>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <div className='buttons'>
          <button type='submit' onClick={handleLogin}>Login</button>
          <button type='button' onClick={handleadmin}>Admin Login</button>
          <button type='signup'>
            <Link to='/signup'>SignUp</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
