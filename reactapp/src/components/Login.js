import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/images/login img.png';
import '../assets/style/Login.css';
import { useAuth } from '../components/contexts/AuthContext'; // Adjust the import path accordingly

function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        console.log('Sending login request with:', formData); // Log request data
        const response = await axios.post(
          'http://127.0.0.1:8080/api/login',
          formData
        );
        console.log('Login Response:', response.data); // Log response data
        const { token, role } = response.data;
        const email = formData.email;

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('email', email);

        login({ email, role });

        switch (role) {
          case 'ROLE_ADMIN':
            navigate('/admindashboard');
            break;
          case 'ROLE_STUDENT':
            navigate('/studentdashboard');
            break;
          case 'ROLE_MENTOR':
            navigate('/mentordashboard');
            break;
          case 'ROLE_HEAD':
            navigate('/headdashboard');
            break;
          case 'ROLE_INTERVIEWER':
            navigate('/interviewerdashboard');
            break;
          default:
            navigate('/');
        }
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message); // Log detailed error information
        setErrors({ form: 'Invalid email or password' });
      }
    }
  };

  return (
    <div className="background-wrapper">
      <div className="login-container">
        <div className="whole">
          <div className="left-half">
            <img src={img} alt="login" />
          </div>
          <div className="right-half">
            <form onSubmit={handleSubmit} className="login-form">
              <h1 style={{ color: '#2f65ad' }}>Login</h1>
              <input
                type="email"
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error-input' : ''}
              />
              {errors.email && <p className="error">{errors.email}</p>}

              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error-input' : ''}
              />
              {errors.password && <p className="error">{errors.password}</p>}
              {errors.form && <p className="error">{errors.form}</p>}

              <button type="submit">Login</button>
              <div className="links">
                <p>
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
