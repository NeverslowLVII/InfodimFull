import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../store/authSlice';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('Checking authentication status:', isAuthenticated);
    if (isAuthenticated) {
      console.log('User is authenticated, navigating to dashboard...');
      navigate('/dashboard');
    } else {
      console.log('User is not authenticated');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    console.log('Attempting to login with username:', username);
    console.log('Attempting to login with password:', password);

    dispatch(loginRequest({ username, password }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Matricule"
        value={username}
        onChange={(e) => {
          console.log('Username input changed:', e.target.value);
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => {
          console.log('Password input changed');
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default LoginPage;