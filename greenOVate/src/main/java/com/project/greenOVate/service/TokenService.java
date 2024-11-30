package com.project.greenOVate.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.greenOVate.entity.Token;
import com.project.greenOVate.entity.UserInfo;
import com.project.greenOVate.repository.TokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

    public Token save(Token token){
        return tokenRepository.save(token);
    }
    
    public Token save(UserInfo userInfo,String jwtToken){
        Token token=Token.builder()
            .userInfo(userInfo)
            .token(jwtToken)
            .revoked(false)
            .expired(false)
            .build();
       return tokenRepository.save(token);
    }

    public void revokeAllUserTokens(UserInfo userInfo){
        List<Token> validUserTokens=tokenRepository.findAllValidTokensByUser(userInfo.getId());

        if(validUserTokens.isEmpty()) return;

        validUserTokens.forEach(t->{
            t.setExpired(true);
            t.setRevoked(true);
        });
        
        tokenRepository.saveAll(validUserTokens);
    }

    public Optional<Token> findByToken(String token) {
        return tokenRepository.findByToken(token);
    }
}
