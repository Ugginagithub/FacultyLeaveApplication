// import React, { useState } from 'react';
// import UserService from '../service/UserService';
// import { useNavigate } from 'react-router-dom';
// import './Registration.css';

// function RegistrationPage() {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         role: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Call the register method from UserService

//             const token = localStorage.getItem('token');
//             await UserService.register(formData, token);

//             // Clear the form fields after successful registration
//             setFormData({
//                 username: '',
//                 password: '',
//                 role: '',
//             });
//             alert('User registered successfully');
//             navigate('/');

//         } catch (error) {
//             console.error('Error registering user:', error);
//             alert('An error occurred while registering user');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <h2 className='title'>Registration</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Userame:</label>
//                     <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
//                 </div>
//                 <div className="form-group">
//                     <label>Password:</label>
//                     <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
//                 </div>
//                 <label>Role:</label>
//                     <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Enter your role" required />
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// }

// export default RegistrationPage;

import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService
            const token = localStorage.getItem('token');
            await UserService.register(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                username: '',
                password: '',
                role: '',
            });
            alert('User registered successfully');
            navigate('/');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div className="auth-container">
            <div className="form-container">
                <h2 className="title">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            placeholder="Enter your role"
                            required
                            style={{ backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationPage;
