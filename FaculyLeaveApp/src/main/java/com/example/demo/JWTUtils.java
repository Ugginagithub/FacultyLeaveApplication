package com.example.demo;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JWTUtils {
			private SecretKey key;
			
			private static final long EXPIRATION_TIME= 86400000;//24hourss
			
			public static String generateSecretKey(int length) {
		        SecureRandom random = new SecureRandom();
		        byte[] keyBytes = new byte[length];
		        random.nextBytes(keyBytes);
		        return Base64.getEncoder().encodeToString(keyBytes);
		    }
			
			public JWTUtils() {
				String secreteString =generateSecretKey(32);
				byte[] keyBytes= Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
				this.key=new SecretKeySpec(keyBytes, "HmacSHA256");
			}
			
			public String generateToken(UserDetails userDetails) {
				return Jwts.builder()
						.subject(userDetails.getUsername())
						.issuedAt(new Date(System.currentTimeMillis()))
						.expiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
						.signWith(key)
						.compact();
			}
			
			public String generateRefreshToken(HashMap<String,Object> claims, UserDetails userDetails) {
				return Jwts.builder()
						.claims(claims)
						.subject(userDetails.getUsername())
						.issuedAt(new Date(System.currentTimeMillis()))
						.expiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
						.signWith(key)
						.compact();
			}
			
			public String extractUsername(String token) {
				return extractClaims(token,Claims::getSubject);
			}
			
			private <T> T extractClaims(String token, Function<Claims, T> claimsFunction) {
				return claimsFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
			}
			
			public boolean isTokenValid(String token, UserDetails userDetails) {
				final String username=extractUsername(token);
				
				return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
			}
			
			public boolean isTokenExpired(String token) {
				return extractClaims(token, Claims::getExpiration).before(new Date());
			}
			
			
			
			
}
