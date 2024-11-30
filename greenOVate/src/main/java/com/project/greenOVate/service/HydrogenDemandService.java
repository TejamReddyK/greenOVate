package com.project.greenOVate.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.greenOVate.entity.HydrogenDemand;
import com.project.greenOVate.repository.HydrogenDemandRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HydrogenDemandService {
   private final HydrogenDemandRepository hydrogenDemandRepository;

    public List<HydrogenDemand> countryWise() {
        // Get distinct countries
        List<String> countries = hydrogenDemandRepository.findDistinctByCountry();
        
        List<HydrogenDemand> allPlantsData = hydrogenDemandRepository.findAll();
        List<HydrogenDemand> allCountriesData = new ArrayList<>();
    
        // Iterate over each unique country
        for (String country : countries) {
            // Create a new HydrogenDemand object for each country
            HydrogenDemand newHd = new HydrogenDemand();
            newHd.setCountry(country);
    
            // Accumulate production capacity and output for the current country
            double demand22 = 0;
            double demand23 = 0;
            
            for (HydrogenDemand hd : allPlantsData) {
                if (country.equals(hd.getCountry())) {  // Correct string comparison
                    demand22 += hd.getYear_22();
                    demand23 += hd.getYear_23();
                }
            }
    
            newHd.setYear_22(demand22);
            newHd.setYear_23(demand23);
            
            // Add the aggregated data to the result list
            allCountriesData.add(newHd);
        }
        
        return allCountriesData;
    }
}
