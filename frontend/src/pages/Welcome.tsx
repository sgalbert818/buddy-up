import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Welcome: React.FC = () => {
  const { token } = useAuth();
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/protected', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => setMessage(response.data.message))
        .catch(() => setMessage('Access Denied'));
    }
  }, [token]);

  return (
    <div>
      <h3>Welcome {message}!</h3>
      <Link to="/"><button>Sign Out</button></Link>
    </div>
  )
};

export default Welcome;