import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const { token, setToken } = useAuth();
  const [user, setUser] = React.useState('');
  const navigate = useNavigate()

  React.useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/protected', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => setUser(response.data.email))
        .catch(() => setUser('Access Denied'));
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const deleteAccount = async () => {
    try {
      await axios.delete('http://localhost:5000/deleteaccount', {
        data: { user }
      });
      localStorage.removeItem('token');
      setToken(null);
      navigate('/');
      alert('User deleted successfully!');
    } catch (err) {
      alert('Failed to delete user');
    }
  }

  return (
    <div>
      <h3>Welcome {user}!</h3>
      <button onClick={logout}>Sign Out</button>
      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  )
};

export default Welcome;