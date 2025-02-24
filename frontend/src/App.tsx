import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import CreateAccount from "./pages/CreateAccount.tsx"

const App: React.FC = () => {
  return (
    <div>
      <h1>BuddyUp</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
};

export default App;
