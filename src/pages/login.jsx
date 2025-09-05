import React, { useState } from 'react';
import './register.css'
import ParticlesComponent from '../components/particles';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
   
  });
  const [errors, setErrors] = useState({});

  // Update field values
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({...prev , [name]:''}));
  };

  // Basic client‐side validation
  const validate = () => {
    const { username, password} = formData;
    const newErrors = {};

    if (!username.trim()) newErrors.username = 'Username is required.';
    if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    // TODO: Replace with your API call (fetch/axios)
    console.log('Registering user:', formData);

    // Reset form on success
    setFormData({
      username: '',
      password: '',
    });
    setErrors({});
  };

  return (
    <div className='app-wrapper'>
      <ParticlesComponent id="particles" />
    <div className='form-wrapper'>
    <form onSubmit={handleSubmit} noValidate className="border border-2 rounded p-4 mx-auto">
      <div><h1>Log In</h1></div>
      {/* Username Field */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && (
          <div className="invalid-feedback">
            {errors.username}
          </div>
        )}
      </div>
      
      
      
      {/* Password Field */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <div className="invalid-feedback">
            {errors.password}
          </div>
        )}
      </div>
      
      <p className="switch-auth">
        Don't have an account?
        <a href="/register">Create Account</a>
      </p>
      
      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-100">
        Log In
      </button>
      
    </form>
    </div>
    </div>
  );
}

export default LoginForm;
