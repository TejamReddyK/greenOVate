package com.project.greenOVate.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.project.greenOVate.entity.UserInfo;
import com.project.greenOVate.repository.UserInfoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserInfoService implements UserDetailsService {
    private final UserInfoRepository userInfoRepository;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserInfo user= userInfoRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("username not found"));
        return new User(user.getEmail(),user.getPassword(),List.of());
    }

    public UserInfo save(UserInfo userInfo){
        return userInfoRepository.save(userInfo);
    }
    
    public Optional<UserInfo> findByEmail(String email){
        return userInfoRepository.findByEmail(email);
    }
    
    public boolean existsByUsername(String username){
        return userInfoRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email){
        return userInfoRepository.existsByEmail(email);
    }

}

