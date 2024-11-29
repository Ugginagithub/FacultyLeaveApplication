// import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";
// import UserService from '../service/UserService';
// import './LoginPage.css'; // Import the CSS

// function LoginPage(){
// const [username, setUsername] = useState('')
// const [password, setPassword] = useState('')
// const [error, setError] = useState('')


// const navigate = useNavigate();

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const userData = await UserService.login(username, password)
//         console.log(userData)
//         if (userData.token) {
//             localStorage.setItem('token', userData.token)
//             localStorage.setItem('role', userData.role)
//             navigate('/profile')
//         }else{
//             setError(userData.message)
//         }
        
//     } catch (error) {
//         console.log(error)
//         setError(error.message)
//         setTimeout(()=>{
//             setError('');
//         }, 5000);
//     }
// }
// const handleRegister = () => {
//     navigate("/register"); // Navigate to RegistrationPage
//   };




//     return(
//         <div className="auth-container">
//             <h1>Faculty leave application</h1>
//             <h2>Login</h2>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Username: </label>
//                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//                 </div>
//                 <div className="form-group">
//                     <label>Password: </label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </div>
//                 <button type="submit">Login</button>

//             </form>
//             <div>
//         <p>Don't have an account?</p>
//         <button onClick={handleRegister}>Register</button> {/* Button for navigation */}
//       </div>
//         </div>
//     )

// }

// export default LoginPage;


// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import UserService from "../service/UserService";
// import Webcam from "react-webcam";
// import "./LoginPage.css"; // Import the CSS

// function LoginPage() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [capturedImage, setCapturedImage] = useState(null); // State for captured image
//     const navigate = useNavigate();
//     const webcamRef = useRef(null); // Reference to the webcam component

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const userData = await UserService.login(username, password);
//             console.log(userData);
//             if (userData.token) {
//                 localStorage.setItem("token", userData.token);
//                 localStorage.setItem("role", userData.role);
//                 navigate("/profile");
//             } else {
//                 setError(userData.message);
//             }
//         } catch (error) {
//             console.log(error);
//             setError(error.message);
//             setTimeout(() => {
//                 setError("");
//             }, 5000);
//         }
//     };

//     const handleCapture = () => {
//         const imageSrc = webcamRef.current.getScreenshot();
//         setCapturedImage(imageSrc); // Store the captured image
//         console.log("Captured Image: ", imageSrc);
//     };

//     const handleRegister = () => {
//         navigate("/register"); // Navigate to RegistrationPage
//     };

//     return (
//         <div className="auth-container">
//             <h1>Faculty Leave Application</h1>
//             <h2>Login</h2>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Username: </label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Password: </label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <div className="webcam-container">
//                     <Webcam
//                         ref={webcamRef}
//                         screenshotFormat="image/jpeg"
//                         className="webcam"
//                     />
//                     <button type="button" onClick={handleCapture}>
//                         Capture Image
//                     </button>
//                 </div>
//                 {capturedImage && (
//                     <div className="captured-image">
//                         <p>Captured Image:</p>
//                         <img src={capturedImage} alt="Captured" />
//                     </div>
//                 )}
//                 <button type="submit">Login</button>
//             </form>
//             <div>
//                 <p>Don't have an account?</p>
//                 <button onClick={handleRegister}>Register</button>
//             </div>
//         </div>
//     );
// }

// export default LoginPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './LoginPage.css'; // Import custom CSS

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await UserService.login(username, password);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                navigate('/profile');
            } else {
                setError(userData.message);
            }
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    // Prevent unnecessary rerenders that could reset input values
    useEffect(() => {
        // Fetch any data you may need to keep the form intact, if needed
    }, []); 

    return (
        <div className="container-fluid login-container">
            <div className="row">
                <div className="col-md-6 form-left">
                    <form onSubmit={handleSubmit} className="login-form">
                        <h2>Login</h2>
                        {error && <p className="error-message">{error}</p>}
                        <div className="form-group">
                            <label>Username:</label>
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                className="form-control" 
                                required
                                style={{ backgroundColor: 'white', color: 'black' }}  // To prevent browser from autofilling and messing with state
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="form-control" 
                                required
                                style={{ backgroundColor: 'white', color: 'black' }}// Same here for password field
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button><br></br>
                    </form>
                    <div className="register-link">
                        <p>Don't have an account?</p>
                        <button onClick={handleRegister} className="btn btn-secondary">Register</button>
                    </div>
                </div>

                <div className="col-md-6 title-right">
                    <h1 className="project-title">Faculty Leave Application</h1>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
