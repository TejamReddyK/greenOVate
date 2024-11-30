package com.project.greenOVate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.greenOVate.Dto.LoginDto;
import com.project.greenOVate.Dto.RegisterDto;

import com.project.greenOVate.service.JwtService;
import com.project.greenOVate.service.TokenService;
import com.project.greenOVate.service.UserInfoService;
import com.project.greenOVate.entity.UserInfo;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserInfoService userInfoService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    
    @GetMapping("/validate")
    public ResponseEntity<Boolean> validate(){
        return new ResponseEntity<>(true,HttpStatus.OK);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {

                if (userInfoService.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("Email is already taken", HttpStatus.BAD_REQUEST);
        }
        if (userInfoService.existsByUsername(registerDto.getUsername())) {
            return new ResponseEntity<>("Username is taken", HttpStatus.BAD_REQUEST);
        }
        System.out.println(registerDto.getUsername()+" "+registerDto.getEmail());
        String encodedPassword = passwordEncoder.encode(registerDto.getPassword());
        UserInfo userInfo=UserInfo.builder().email(registerDto.getEmail()).password(encodedPassword).username(registerDto.getUsername()).build();
        System.out.println(userInfo.getUsername()+" "+userInfo.getEmail());
        userInfoService.save(userInfo);
        UserDetails userDetails = userInfoService.loadUserByUsername(userInfo.getEmail());
        String jwtToken = jwtService.generateToken(userDetails);
       
        tokenService.save(userInfo,jwtToken);
        System.out.println(jwtToken);
        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {

        Authentication authentication;
        try{
            authentication= authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        }
        catch(AuthenticationException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = userInfoService.loadUserByUsername(loginDto.getEmail());
        String jwtToken = jwtService.generateToken(userDetails);

        UserInfo userInfo=userInfoService.findByEmail(loginDto.getEmail()).orElseThrow();
        tokenService.revokeAllUserTokens(userInfo);
        tokenService.save(userInfo,jwtToken);

        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }

}