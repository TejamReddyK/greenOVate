package com.project.greenOVate.filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.greenOVate.service.JwtService;
import com.project.greenOVate.service.TokenService;
import com.project.greenOVate.service.UserInfoService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserInfoService userInfoService;
    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest   request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String email;

        // Bypass authentication for auth endpoints
        if (request.getRequestURI().startsWith("/api/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Check for Bearer token presence
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 Bad Request
            response.setContentType("application/json");
            response.getWriter().write("{\"message\":\"Invalid request\"}");
            response.getWriter().flush();
            return;
        }

        jwt = authHeader.substring(7);
        try{
            email = jwtService.extractUsername(jwt);
            System.out.println(email);
        // Validate token and authenticate user
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            boolean isValidToken = tokenService.findByToken(jwt)
                .map(t -> !t.isExpired() && !t.isRevoked())
                .orElse(false);

            if (isValidToken && jwtService.isTokenValid(jwt, userInfoService.loadUserByUsername(email))) {
                UserDetails userDetails = userInfoService.loadUserByUsername(email);
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
                response.setContentType("application/json");
                response.getWriter().write("{\"message\":\"Session Expired\"}");
                response.getWriter().flush();
                return;
            }
        }
    }
    catch(Exception e){
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400 Bad Request
        response.setContentType("application/json");
        response.getWriter().write("{\"message\":\"Invalid request(Token Signature)\"}");
        response.getWriter().flush();
        return;
    }

        filterChain.doFilter(request, response);
    }
}
