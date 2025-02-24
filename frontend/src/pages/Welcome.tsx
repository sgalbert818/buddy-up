import React from 'react';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div>
      <h3>Welcome user!</h3>
      <Link to="/"><button>Sign Out</button></Link>
    </div>
  )
};

export default Welcome;