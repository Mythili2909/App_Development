import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/style/Register.css';

import img from '../assets/images/reg img.png';

function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
        roles: '' // Default roles set to an empty string
    });

    const [errors, setErrors] = useState({
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
        roles: '' // Add roles error handling
    });

    const apiurl = "http://127.0.0.1:8080/api/users";
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.firstname) {
            newErrors.firstname = 'Firstname is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/[a-zA-Z]/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one alphabet';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords must match';
        }

        if (!formData.roles) {
            newErrors.roles = 'Role is required'; // Error handling for roles
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Stop the function here if there are validation errors
        }

        try {
            const response = await axios.post(apiurl, {
                id: 0,
                firstname: formData.firstname,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                roles: formData.roles // Updated field name
            });

            console.log(response);
            alert("User created successfully");
            navigate("/login"); // Navigate to login after successful registration
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="background-wrapper">
            <div className="login-container">
                <div className="whole">
                    <div className="left-half">
                        <img src={img} alt="register" />
                    </div>
                    <div className="right-half">
                        <form onSubmit={handleSubmit} className="login-form">
                            <h1>Register</h1>
                            <input
                                type="text"
                                placeholder="Username"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className={errors.firstname ? 'error-input' : ''}
                            />
                            {errors.firstname && <p className="error">{errors.firstname}</p>}
                            <input
                                type="email"
                                placeholder="E-mail address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'error-input' : ''}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'error-input' : ''}
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                            <input
                                type="password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'error-input' : ''}
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                            <input
                                type="text"
                                placeholder="Enter your roles"
                                name="roles"
                                value={formData.roles}
                                onChange={handleChange}
                                className={errors.roles ? 'error-input' : ''}
                            />
                            {errors.roles && <p className="error">{errors.roles}</p>} {/* Display roles error */}
                            <button type="submit">Sign Up</button>
                            <p>Have an account? <Link to='/login'>Sign In</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
