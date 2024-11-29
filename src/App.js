import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom";
import LoginPage from "./Components/auth/LoginPage";
import RegistrationPage from "./Components/auth/RegistrationPage";
//import UserService from './Components/service/UserService';
import ProfilePage from "./Components/userpage/ProfilePage";
import UserPage from "./Components/userpage/UserPage";
import WebcamCapture from "./Components/auth/caputre";

function App(){
    return(
        <BrowserRouter>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/user" element={<UserPage/>}/>
            <Route path="/cam" element={<WebcamCapture/>}/>
          </Routes>
        </div>
        {/* <FooterComponent /> */}
      </div>
    </BrowserRouter>
    );
}
export default App;