import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string,
  password: string,
  confirmPassword: string
}

interface Error {
  response: {
    data: {
      message: string
    }
  }
  status: number
}

const CreateAccount: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert('Ensure all fields are filled out.')
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Password entries do not match.')
      return;
    }
    try {
      await axios.post('http://localhost:5000/createaccount', formData);
      navigate('/');
      alert('User registered successfully!');
    } catch (err) {
      const error = err as Error;
      alert(error.response.data.message)
    }
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <div>
      <h3>Create Account</h3>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Email">
          </input>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Password">
          </input>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Confirm Password">
          </input>
          {/*<Link to="/welcome"><button>Register</button></Link>*/}
          <button type="submit">Register</button>
        </form>
      </div>
      <h3>Already have an account?</h3>
      <Link to="/"><button>Login</button></Link>
    </div>
  );
};

export default CreateAccount;