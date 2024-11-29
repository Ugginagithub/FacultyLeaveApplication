package com.example.demo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepo extends JpaRepository<FacultyData, Integer> {
	Optional<FacultyData> findByUsername(String username);
}
