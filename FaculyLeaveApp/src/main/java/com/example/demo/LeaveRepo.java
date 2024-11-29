package com.example.demo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRepo extends JpaRepository<LeaveData, Integer> {
	Optional<LeaveData> findByUsername(String username);
}
