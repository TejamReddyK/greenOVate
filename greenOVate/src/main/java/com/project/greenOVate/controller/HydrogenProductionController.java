package com.project.greenOVate.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.greenOVate.Dto.TypeWise;
import com.project.greenOVate.entity.HydrogenProduction;
import com.project.greenOVate.service.HydrogenProductionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/production")
@RequiredArgsConstructor
public class HydrogenProductionController {
    private final HydrogenProductionService hydrogenProductionService;

    @GetMapping("/countryandtypewise")
    public ResponseEntity<List<HydrogenProduction>> productionData(){
        return new ResponseEntity<>(hydrogenProductionService.countryAndProcessWise(),HttpStatus.OK);
    }

    @GetMapping("/typewise")
    public ResponseEntity<List<TypeWise>> typeWiseData(){
        return new ResponseEntity<>(hydrogenProductionService.processWise(),HttpStatus.OK);
    }

    @GetMapping("/countrywise")
    public ResponseEntity<List<TypeWise>> countryWise(){
        return new ResponseEntity<>(hydrogenProductionService.countryWise(),HttpStatus.OK);
    }
}
