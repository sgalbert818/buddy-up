import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const { token, setToken } = useAuth();
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate()

  React.useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/protected', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => setMessage(response.data.message))
        .catch(() => setMessage('Access Denied'));
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  return (
    <div>
      <h3>Welcome {message}!</h3>
      <button onClick={logout}>Sign Out</button>
    </div>
  )
};

export default Welcome;