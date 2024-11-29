package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserManagementService {
	@Autowired
	private FacultyRepo repo;
	
	@Autowired
	private LeaveRepo repo1;
	
	@Autowired
	private JWTUtils ju;
	
	@Autowired
	private AuthenticationManager am;
	
	@Autowired
	private PasswordEncoder pe;
	
	public ReqRespDto register(ReqRespDto registrationRequest) {
        ReqRespDto resp = new ReqRespDto();
        try {
            FacultyData ourUsers = new FacultyData();
            ourUsers.setRole(registrationRequest.getRole());
            ourUsers.setUsername(registrationRequest.getUsername());
            ourUsers.setPassword(pe.encode(registrationRequest.getPassword()));

            FacultyData savedUser = repo.save(ourUsers);
            if (savedUser.getId() > 0) {
                resp.setOurUsers(savedUser);
                resp.setMessage("User saved successfully");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError("Error during registration: " + e.getMessage());
        }
        return resp;
    }
	
	//login
	public ReqRespDto login(ReqRespDto loginRequest) {
        ReqRespDto resp = new ReqRespDto();
        try {
            // Authenticate user credentials
            am.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            FacultyData user = repo.findByUsername(loginRequest.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
            String jwt = ju.generateToken(user);
//            String refreshToken = ju.generateRefreshToken(new HashMap<>(), user);

            resp.setStatusCode(200);
            resp.setToken(jwt);
//            resp.setRefreshToken(refreshToken);
            resp.setExpirationTime("24Hrs");
            resp.setMessage("Successfully logged in");
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("Login failed: " + e.getMessage());
        }
        return resp;
    }
	
	 
	
	
	
	// Token Refresh
    public ReqRespDto refreshToken(ReqRespDto refreshTokenRequest) {
        ReqRespDto response = new ReqRespDto();
        try {
            String email = ju.extractUsername(refreshTokenRequest.getToken());
            FacultyData user = repo.findByUsername(email).orElseThrow(() -> new RuntimeException("User not found"));

            if (ju.isTokenValid(refreshTokenRequest.getToken(), user)) {
                String newToken = ju.generateToken(user);
                response.setStatusCode(200);
                response.setToken(newToken);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully refreshed token");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Token refresh failed: " + e.getMessage());
        }
        return response;
    }
    
 // Get All Users
    public ReqRespDto getAllUsers() {
        ReqRespDto reqRes = new ReqRespDto();
        try {
            List<FacultyData> result = repo.findAll();
            if (!result.isEmpty()) {
                reqRes.setOurUserList(result);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }
    
 // Get User by ID
    public ReqRespDto getUsersById(Integer id) {
        ReqRespDto reqRes = new ReqRespDto();
        try {
        	FacultyData user = repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            reqRes.setOurUsers(user);
            reqRes.setStatusCode(200);
            reqRes.setMessage("User with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }
    
 // Get User Info by Email
    public ReqRespDto getMyInfo(String email) {
        ReqRespDto reqRes = new ReqRespDto();
        try {
            FacultyData user = repo.findByUsername(email).orElseThrow(() -> new RuntimeException("User not found"));
            reqRes.setOurUsers(user);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Successful");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;
    }
    
    public LeaveDTO applyForLeave(LeaveDTO registrationRequest) {
    	LeaveDTO resp = new LeaveDTO();
        try {
            LeaveData ourUsers = new LeaveData();
            ourUsers.setUsername(registrationRequest.getUsername());
            ourUsers.setReason(registrationRequest.getReason());
            ourUsers.setStatus("Pending");

            LeaveData savedUser = repo1.save(ourUsers);
            if (savedUser.getId() > 0) {
                resp.setOurUsers(savedUser);
                resp.setMessage("User saved successfully");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError("Error during registration: " + e.getMessage());
        }
        return resp;
    }
    
 // Fetch all leave requests (ADMIN role)
    public List<LeaveDTO> getAllLeaveRequests() {
        List<LeaveDTO> leaveDTOList = new ArrayList<>();
        try {
            // Fetch all leave requests as List<LeaveData>
            List<LeaveData> leaveRequests = repo1.findAll();
            
            // Convert each LeaveData to LeaveDTO and add to leaveDTOList
            for (LeaveData leave : leaveRequests) {
                LeaveDTO leaveDTO = new LeaveDTO();
                leaveDTO.setUsername(leave.getUsername());
                leaveDTO.setReason(leave.getReason());
                leaveDTO.setStatus(leave.getStatus());
                leaveDTOList.add(leaveDTO);
            }
        } catch (Exception e) {
            // Handle exception and print error
            System.out.println("Error fetching leave requests: " + e.getMessage());
        }
        return leaveDTOList;
    }
    
    
    public LeaveDTO updateLeaveStatus(String username, String action) {
    	LeaveDTO reqRes = new LeaveDTO();
        try {
            LeaveData user = repo1.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
            
            // Assuming you're updating leave status based on 'action'
            user.setStatus(action); // Assuming 'action' is 'APPROVE' or 'DECLINE'
            repo1.save(user); // Persist the updated user data
            
            reqRes.setStatusCode(200);
            reqRes.setMessage("Leave status updated successfully for user: " + username);
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating leave status: " + e.getMessage());
        }
        return reqRes;
    }
    
    public LeaveDTO getUserStatus(String username) {
        LeaveData leaveData = repo1.findByUsername(username).orElse(null);
        if (leaveData == null) {
            return null; // Return null if not found
        }
        LeaveDTO leaveDTO = new LeaveDTO();
        leaveDTO.setUsername(leaveData.getUsername());
        leaveDTO.setStatus(leaveData.getStatus());
        return leaveDTO;
    }
    
    public void deleteLeave(String username) {
        // Find the leave request by username using Optional
        Optional<LeaveData> leave = repo1.findByUsername(username);
        
        // Check if the leave data is present
        if (leave.isPresent()) {
            // Delete the leave request if found
            repo1.delete(leave.get());  // Extract the LeaveData object from Optional and delete it
        } else {
            // Throw an exception if no leave request is found for the given username
            throw new RuntimeException("No leave request found for the user: " + username);
        }
    }
    
    
    
   }

