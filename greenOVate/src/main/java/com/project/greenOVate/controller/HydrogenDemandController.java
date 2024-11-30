package com.project.greenOVate.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.greenOVate.entity.HydrogenDemand;
import com.project.greenOVate.service.HydrogenDemandService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/demand")
@RequiredArgsConstructor
public class HydrogenDemandController {
    private final HydrogenDemandService hydrogenDemandService;

    @GetMapping("/")
    public ResponseEntity<List<HydrogenDemand>> demandData(){
        return new ResponseEntity<>(hydrogenDemandService.countryWise(),HttpStatus.OK);
    }
}
