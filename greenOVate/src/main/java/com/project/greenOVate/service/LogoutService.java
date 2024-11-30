package com.project.greenOVate.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.project.greenOVate.entity.Token;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenService tokenService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        System.out.println("in logout");
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        
        if(authHeader==null) {
            sendErrorResponse(response,HttpServletResponse.SC_BAD_REQUEST,"Invalid Request");
            return;
        }

        jwt = authHeader.substring(7);
        Token storedToken = tokenService.findByToken(jwt).orElse(null);

        if(storedToken==null) {
            sendErrorResponse(response,HttpServletResponse.SC_BAD_REQUEST,"Invalid Request(Token Signature)");
            return;
        }

        if (storedToken != null) {
            System.out.println("in logout 2");
            if (storedToken.isExpired() || storedToken.isRevoked()) {
                System.out.println(storedToken.isExpired());
                sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Session Expired");
                return;
            }
            // Invalidate the token
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            tokenService.save(storedToken);
        }

        // Clear the security context and respond with success
        sendSuccessResponse(response,"Logged out Successfully");
        SecurityContextHolder.clearContext();
    }

    private void sendErrorResponse(HttpServletResponse response, int status, String message) {
        response.setStatus(status);
        response.setContentType("application/json");
        try {
            response.getWriter().write("{\"message\":\"" + message + "\"}");
            response.getWriter().flush();
        } catch (IOException e) {
            e.printStackTrace(); 
        }
    }

    private void sendSuccessResponse(HttpServletResponse response, String message) {
        System.out.println("in logout 3");
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        try {
            response.getWriter().write("{\"message\":\"" + message + "\"}");
            response.getWriter().flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
