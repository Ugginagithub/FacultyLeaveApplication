package com.example.demo;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class JWTAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JWTUtils ju;

    @Autowired
    private FacultyDetailsService fds;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Retrieve the Authorization header
        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        // Check if the Authorization header is missing or doesn't start with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Continue the filter chain if no JWT found
            return;
        }

        // Extract JWT token from the Authorization header
        jwtToken = authHeader.substring(7); // Skip the "Bearer " part

        try {
            // Extract the user email (or username) from the JWT token
            userEmail = ju.extractUsername(jwtToken);
        } catch (Exception e) {
            filterChain.doFilter(request, response); // If token parsing fails, skip the filter
            return;
        }

        // Check if the userEmail is not null and there's no authentication already present
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Load user details from the database
            UserDetails ud = fds.loadUserByUsername(userEmail);

            // Validate the JWT token
            if (ju.isTokenValid(jwtToken, ud)) {
                // Create UsernamePasswordAuthenticationToken with authorities
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        ud, null, ud.getAuthorities()
                );
                // Set details for the token
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Set the authentication into the SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
