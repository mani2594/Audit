// src/components/LoginPage.tsx
import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../../Services/LoginApi';
import { useDispatch } from 'react-redux';
import { AddUserId } from '../Redux/Reducers/createSlice';

interface LoginProps {  
}
export interface LoginModel{
  username: string;
  password: string;
}
const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoginFormValid = username.trim() !== '' && password.trim() !== '';

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);    
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);    
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
      var res= await LoginApi.login({
        username:username,password:password
      });       
      if (res.token!=null) {
        dispatch(AddUserId(res));        
        navigate('/home'); // Redirect to the home page after successful login
      } else {
        // Handle invalid login
        alert('Invalid username or password. Please try again.');
      }
        
    }
    catch(error){

    }
    // Add your login logic here

  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {isLoginFormValid && (
            <button type="submit">Login</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

