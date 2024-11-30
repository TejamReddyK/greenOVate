package com.project.greenOVate.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    static SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
	public static final String SECRET = Encoders.BASE64.encode(key.getEncoded());

    private Claims extractAllClaims(String token){
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    public <T> T extractClaim(String token, Function<Claims,T> claimResolver){
        final Claims claims=extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Key getSignKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}

    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
     }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    } 

    public String extractUsername(String token) {
        return extractClaim(token,Claims::getSubject);
     }

    public boolean isTokenValid(String token, UserDetails userDetails ){
        final String username=extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public String generateToken(Map<String,Object> extraClaims,UserDetails userDetails ){
        // List<String> roles = userDetails .getAuthorities().stream()
        //     .map(GrantedAuthority::getAuthority)
        //     .collect(Collectors.toList());
        // extraClaims.put("roles", String.join(",",roles));
        return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60))
            .signWith(getSignKey(),SignatureAlgorithm.HS256)
            .compact();
    }

    public String generateToken(UserDetails userDetails ){
        return generateToken(new HashMap<>(), userDetails );
    }

}
