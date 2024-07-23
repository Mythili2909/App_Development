import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../assets/style/Register.css';
function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        email: '',
        password: '',
        dob: ''
    });

    const [errors, setErrors] = useState({
        firstname: '',
        email: '',
        password: '',
        dob: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
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

        if (!formData.dob) {
            newErrors.dob = 'Date of Birth is required';
        } else if (new Date(formData.dob) > new Date()) {
            newErrors.dob = 'Enter the valid DOB';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            console.log(formData);
            navigate("/login"); // Navigate to login after registration
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Firstname </label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                />
                {errors.firstname && <p style={{ color: 'red' }}>{errors.firstname}</p>}
                
                <label>Email </label>
                <input
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

                <label>Password </label>
                <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

                <label>DOB </label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                />
                {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}

                <button type="submit">Register</button>
            <p>Already have an account? <Link to='/login'>Login here</Link></p>
            </form>
        </div>
    );
}

export default Register;
