package com.project.greenOVate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.greenOVate.entity.HydrogenDemand;


@Repository
public interface HydrogenDemandRepository extends JpaRepository<HydrogenDemand,Long>{
    List<HydrogenDemand> findAll();

    @Query("SELECT DISTINCT hp.country FROM HydrogenDemand hp")
    List<String> findDistinctByCountry();
} 