import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

interface FormData {
  email: string,
  password: string,
}

const Login: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      alert('Ensure all fields are filled out.')
      return;
    }
    console.log(formData)
    setFormData({
      email: '',
      password: '',
    })
  }

  return (
    <div>
      <h3>Login</h3>
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
          {/*<Link to="/welcome"><button>Login</button></Link>*/}
          <button type="submit">Login</button>
        </form>
      </div>
      <h3>New User?</h3>
      <Link to="/createaccount"><button>Create Account</button></Link>
    </div>
  )
};

export default Login;