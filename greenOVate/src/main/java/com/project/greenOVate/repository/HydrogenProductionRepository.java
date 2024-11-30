package com.project.greenOVate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.greenOVate.entity.HydrogenProduction;

@Repository
public interface HydrogenProductionRepository extends JpaRepository<HydrogenProduction, Long>{
    List<HydrogenProduction> findAll();
    @Query("SELECT DISTINCT hp.country FROM HydrogenProduction hp")
    List<String> findDistinctByCountry();
    @Query("SELECT DISTINCT hp.processType FROM HydrogenProduction hp")
    List<String> findDistinctByProcessType();
}
