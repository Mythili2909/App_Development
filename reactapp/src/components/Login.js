import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from '../assets/images/login img.png';

import '../assets/style/Login.css';
import Navbar from "./Navbar";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8080/api/login",
                    formData
                );
                const { token, role } = response.data;

                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                switch (role) {
                    case "ROLE_ADMIN":
                        navigate("/admindashboard");
                        break;
                    case "ROLE_INTERVIEWER":
                        navigate("/interviewerdashboard");
                        break;
                    case "ROLE_MENTOR":
                        navigate("/mentordashboard");
                        break;
                    case "ROLE_HEAD":
                        navigate("/headdashboard");
                        break;
                    case "ROLE_STUDENT":
                        navigate("/studentdashboard");
                        break;
                    default:
                        navigate("/"); // Redirect to a default route if the role does not match
                }
            } catch (error) {
                console.error("Login failed:", error);
                setErrors({ ...errors, form: "Invalid email or password" });
            }
        }
    };

    return (
        <div className="background-wrapper">
            <Navbar />
            <div className="login-container">
                <div className="whole">
                    <div className="left-half">
                        <img src={img} alt="login" />
                    </div>
                    <div className="right-half">
                        <form onSubmit={handleSubmit} className="login-form">
                            <h1>Login</h1>
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
                                <p><Link to="/forgot-password">Forgot Password?</Link></p>
                                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
