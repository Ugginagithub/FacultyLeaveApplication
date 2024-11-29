package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
	@Autowired
	private UserManagementService ums;
	
	@Autowired
	LeaveRepo repo;
	
	@PostMapping("/auth/register")
    public ResponseEntity<ReqRespDto> regeister(@RequestBody ReqRespDto reg){
        return ResponseEntity.ok(ums.register(reg));
    }
	
	@PostMapping("/auth/login")
    public ResponseEntity<ReqRespDto> login(@RequestBody ReqRespDto req){
        return ResponseEntity.ok(ums.login(req));
    }
	
	@GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<ReqRespDto> getUSerByID(@PathVariable Integer userId){
        return ResponseEntity.ok(ums.getUsersById(userId));

    }
	
	@GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRespDto> getAllUsers(){
        return ResponseEntity.ok(ums.getAllUsers());
    }
	
	@GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRespDto> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRespDto response = ums.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }
	
	@PostMapping("/user/apply-leave")
    public ResponseEntity<LeaveDTO> regeister(@RequestBody LeaveDTO reg){
        return ResponseEntity.ok(ums.applyForLeave(reg));
    }
	
	@GetMapping("/admin/getLeaves")
    public ResponseEntity<List<LeaveDTO>> getLeaves(){
        return ResponseEntity.ok(ums.getAllLeaveRequests());
    }
	
	@PutMapping("/admin/update/{username}")
	public ResponseEntity<LeaveDTO> updateUser(@PathVariable String username, @RequestBody LeaveDTO leaveDTO) {
	    return ResponseEntity.ok(ums.updateLeaveStatus(username, leaveDTO.getStatus()));
	}
	
	@GetMapping("/user/status/{username}")
	public ResponseEntity<LeaveDTO> getStatus(@PathVariable String username) {
		LeaveDTO leaveDTO = ums.getUserStatus(username);
		if (leaveDTO == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(leaveDTO);
	}
	
	
	@DeleteMapping("/user/deleteleave/{username}")
	public ResponseEntity<LeaveDTO> deleteLeave(@PathVariable String username) {
	    // Confirm leave and delete leave request for the user
	    ums.deleteLeave(username);
	    
	    // Create a LeaveDTO object (assuming it's a class representing leave details)
	    LeaveDTO leaveDTO = new LeaveDTO();
	    leaveDTO.setMessage("Leave details deleted successfully.");
	    
	    return ResponseEntity.ok(leaveDTO);
	}
}
