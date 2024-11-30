package com.project.greenOVate.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.greenOVate.entity.UserInfo;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo,Long>{
    Optional<UserInfo> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
