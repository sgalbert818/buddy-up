import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string,
  age: number | string,
  interests: Array<string>
}

interface Error {
  response: {
    data: {
      message: string
    }
  }
  status: number
}

const Welcome: React.FC = () => {
  const { token, setToken, email, setEmail } = useAuth();
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    interests: []
  })

  // handle formData change

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'text' || type === 'number') {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    if (type === 'checkbox') {
      if (checked) { // add to array
        setFormData({
          ...formData,
          interests: [...formData.interests, value],
        });
      } else { // remove from array
        setFormData({
          ...formData,
          interests: formData.interests.filter((interest) => interest !== value),
        });
      }
    }
  };

  // handle form submission, edit user profile in db

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.interests.length) {
      alert('Ensure all fields are filled out.')
      return;
    }
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Ensure it's treated as JSON
          }
        };
        await axios.post('http://localhost:5000/createprofile', formData, config);
        // navigate('/');
        console.log('sent to backend, updated in db');
      } catch (err) {
        const error = err as Error;
        alert(error.response.data.message)
      }
      setFormData({
        name: '',
        age: '',
        interests: []
      })
    }
  };  

  // logout user, clear JWT session

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setEmail(null);
    navigate('/');
  };

  // delete user account

  const deleteAccount = async () => {
    try {
      await axios.delete('http://localhost:5000/deleteaccount', {
        data: { email }
      });
      localStorage.removeItem('token');
      setToken(null);
      navigate('/');
      alert('User deleted successfully!');
    } catch (err) {
      alert('Failed to delete user');
    }
  }

  // test button to ensure edits were made

  const test = async () => {
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Ensure it's treated as JSON
          }
        };
        const response = await axios.post('http://localhost:5000/test', 'placeholder', config);
        console.log('Response from backend:', response.data);
      } catch (err) {
        const error = err as Error;
        alert(error.response.data.message)
      }
    }
  }; 

  return (
    <div>
      {/*<h3>Welcome {user}!</h3>*/}
      <h3>Tell us a little bit about yourself. You can edit this at any time.</h3>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Name">
          </input>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Age">
          </input>
          <div>
            <legend>Interests</legend>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="sports"
                checked={formData.interests.includes('sports')}
                onChange={handleChange}
              />
              Sports
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="interests"
                value="art"
                checked={formData.interests.includes('art')}
                onChange={handleChange}
              />
              Art
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="interests"
                value="gaming"
                checked={formData.interests.includes('gaming')}
                onChange={handleChange}
              />
              Gaming
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="interests"
                value="outdoors"
                checked={formData.interests.includes('outdoors')}
                onChange={handleChange}
              />
              Outdoors
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="interests"
                value="music"
                checked={formData.interests.includes('music')}
                onChange={handleChange}
              />
              Music
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="interests"
                value="going out"
                checked={formData.interests.includes('going out')}
                onChange={handleChange}
              />
              Going Out
            </label>
          </div>
          <button type="submit">Save Profile</button>
        </form>
      </div>
      <button onClick={test}>Test</button>
      <button onClick={logout}>Sign Out</button>
      <button onClick={deleteAccount}>Delete Account</button>
    </div>
  )
};

export default Welcome;