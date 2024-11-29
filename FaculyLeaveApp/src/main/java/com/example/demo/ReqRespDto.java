package com.example.demo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown=true)
public class ReqRespDto {
	private int statusCode;
	private String error;
	private String message;
	private String token;
	private String refreshToken;
	private String expirationTime;
	private String username;
	private String role;
	private String password;
	private FacultyData ourUsers;
	private List<FacultyData> ourUserList;
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getRefreshToken() {
		return refreshToken;
	}
	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
	public String getExpirationTime() {
		return expirationTime;
	}
	public void setExpirationTime(String expirationTime) {
		this.expirationTime = expirationTime;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public FacultyData getOurUsers() {
		return ourUsers;
	}
	public void setOurUsers(FacultyData ourUsers) {
		this.ourUsers = ourUsers;
	}
	public List<FacultyData> getOurUserList() {
		return ourUserList;
	}
	public void setOurUserList(List<FacultyData> ourUserList) {
		this.ourUserList = ourUserList;
	}
	public ReqRespDto(int statusCode, String error, String message, String token, String refreshToken,
			String expirationTime, String username, String role, String password, FacultyData ourUsers,
			List<FacultyData> ourUserList) {
		super();
		this.statusCode = statusCode;
		this.error = error;
		this.message = message;
		this.token = token;
		this.refreshToken = refreshToken;
		this.expirationTime = expirationTime;
		this.username = username;
		this.role = role;
		this.password = password;
		this.ourUsers = ourUsers;
		this.ourUserList = ourUserList;
	}
	public ReqRespDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
