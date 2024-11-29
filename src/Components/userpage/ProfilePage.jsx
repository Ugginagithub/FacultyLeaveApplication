import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import './ProfilePage.css'; // Import the CSS

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});
    const [leaveStatus, setLeaveStatus] = useState('');
    const [showLeaveForm, setShowLeaveForm] = useState(false);
    const [leaveFormData, setLeaveFormData] = useState({ reason: '' });
    const [leaveRequests, setLeaveRequests] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    useEffect(() => {
        if (profileInfo.role === 'ADMIN') {
            fetchLeaveRequests();
        } else if (profileInfo.role === 'USER') {
            fetchLeaveStatus(profileInfo.username);
        }
    }, [profileInfo.role]);

    // Fetch profile info for the logged-in user
    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
            setLeaveStatus(response.ourUsers.leaveStatus);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    // Fetch leave status for the user
    const fetchLeaveStatus = async (username) => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getStatus(token, username);
            setLeaveStatus(response.status);
        } catch (error) {
            console.error('Error fetching leave status:', error);
        }
    };

    // Fetch leave requests for ADMIN role
    const fetchLeaveRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getAllLeaveRequests(token);
            setLeaveRequests(response);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    };

    // For users (USER role) to apply for leave
    const handleApplyLeave = async () => {
        const { reason } = leaveFormData;

         // Validate that reason is not empty
            if (!reason.trim()) {
                alert('Please provide a reason for the leave.');
                return; // Stop form submission if reason is empty
            }

        try {
            const token = localStorage.getItem('token');
            const { reason } = leaveFormData;
            const username = profileInfo.username;
            await UserService.applyForLeave(token, username, reason);
            setLeaveStatus('Pending');
            setShowLeaveForm(false);
        } catch (error) {
            console.error('Error applying for leave:', error);
        }
    };

    // Confirm leave status and delete leave from the database
    const handleConfirmStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const username = profileInfo.username;
            await UserService.confirmLeaveStatus(token, username);
            setLeaveStatus('No leave applied');
            
        } catch (error) {
            console.error('Error confirming leave status:', error);
        }
    };

    // Handle form input changes for leave application
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setLeaveFormData({ ...leaveFormData, [name]: value });
    };

    const handleLeaveAction = async (username, action) => {
        try {
            const token = localStorage.getItem('token');
            await UserService.updateLeaveStatus(token, username, action);
            fetchLeaveRequests();
        } catch (error) {
            console.error('Error updating leave status:', error);
        }
    };

    // Handle logout with confirmation
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    return (
        <div className="profile-page-container">
            <h2>Profile Information</h2>
            <p>Username: {profileInfo.username}</p>
            <p>Role: {profileInfo.role}</p>

            {/* USER role */}
            {profileInfo.role === 'USER' && (
                <div>
                    <h3>
                        Check Leave Status: 
                        {leaveStatus && leaveStatus.length === 0 ? "No value" : leaveStatus || "No leave applied"}
                    </h3>

                    {/* Logic for showing the right button based on leave status */}
                    {leaveStatus === 'Pending' ? (
                        null
                    ) : leaveStatus === 'APPROVE' || leaveStatus === 'DECLINE' ? (
                        <button onClick={handleConfirmStatus}>Confirm Leave Status</button>
                    ) : (
                        <button onClick={() => setShowLeaveForm(true)}>Apply for Leave</button>
                    )}

                    {/* Show leave application form */}
                    {showLeaveForm && (
                        <div>
                            <h4>Leave Application Form</h4>
                            <div className="form-group">
                                <label>Reason for Leave:</label>
                                <input
                                    type="text"
                                    name="reason"
                                    value={leaveFormData.reason}
                                    onChange={handleFormChange}
                                required/>
                                <label>From:</label>
                                <input type="date"></input>
                                <label>To:</label>
                                <input type="date"></input>
                            </div>
                            <button onClick={handleApplyLeave}>Submit Leave Application</button>
                        </div>
                    )}
                </div>
            )}

            {/* ADMIN role*/}
            {profileInfo.role === 'ADMIN' && (
                <div>
                    <h3>Manage Leave Requests</h3>
                    {leaveRequests.length === 0 ? (
                        <p>No leave requests found.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveRequests.map((request) => (
                                    <tr key={request.username}>
                                        <td>{request.username}</td>
                                        <td>{request.reason}</td>
                                        <td>{request.status}</td>
                                        <td>
                                            <button onClick={() => handleLeaveAction(request.username, 'APPROVE')}>Approve</button>
                                            <button onClick={() => handleLeaveAction(request.username, 'DECLINE')}>Decline</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            <button onClick={handleLogout}>Log out</button>
        </div>
    );
}

export default ProfilePage;
