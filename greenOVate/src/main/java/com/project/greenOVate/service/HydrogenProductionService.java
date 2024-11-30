package com.project.greenOVate.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.greenOVate.repository.HydrogenProductionRepository;

import lombok.RequiredArgsConstructor;

import com.project.greenOVate.Dto.TypeWise;
import com.project.greenOVate.entity.HydrogenProduction;

@Service
@RequiredArgsConstructor
public class HydrogenProductionService {
    private final HydrogenProductionRepository hydrogenProductionRepository;

    public List<HydrogenProduction> countryAndProcessWise() {
        // Get distinct countries and process types from the repository
        List<String> countries = hydrogenProductionRepository.findDistinctByCountry();
        List<String> processTypes = hydrogenProductionRepository.findDistinctByProcessType();
        
        // Get all the data from the repository
        List<HydrogenProduction> allPlantsData = hydrogenProductionRepository.findAll();
        List<HydrogenProduction> allCountriesData = new ArrayList<>();
        
        // Loop through each country and process type combination
        for (String country : countries) {
            for (String processType : processTypes) {
                HydrogenProduction newHp = new HydrogenProduction();
                newHp.setCountry(country);
                newHp.setProcessType(processType);
                
                // Initialize totals
                double totalProductionCapacity = 0;
                double totalOutput = 0;
                
                // Loop through all the plants data to aggregate production and output
                for (HydrogenProduction hp : allPlantsData) {
                    if (country.equals(hp.getCountry()) && processType.equals(hp.getProcessType())) {
                        totalProductionCapacity += hp.getProductionCapacity();
                        totalOutput += hp.getOutput();
                    }
                }

                // Set the aggregated totals for the current country-processType
                newHp.setProductionCapacity(totalProductionCapacity);
                newHp.setOutput(totalOutput);

                // Add the data for this country-processType combination to the result list
                allCountriesData.add(newHp);
            }
        }
        
        return allCountriesData;
    }

    public List<TypeWise> processWise(){
        List<HydrogenProduction> hps=countryAndProcessWise();
        List<String> pts=hydrogenProductionRepository.findDistinctByProcessType();
        List<TypeWise> processes=new ArrayList<>();
        for(String pt:pts){
            TypeWise newpt=new TypeWise();
            newpt.setTypeWise(pt);
            double totalProductionCapacity = 0;
            double totalOutput = 0;
            for (HydrogenProduction hp : hps) {
                if (pt.equals(hp.getProcessType())) {
                    totalProductionCapacity += hp.getProductionCapacity();
                    totalOutput += hp.getOutput();
                }
            }
            newpt.setOutput(totalOutput);
            newpt.setProductionCapacity(totalProductionCapacity);
            processes.add(newpt);
        }
        return processes;
    }

    public List<TypeWise> countryWise(){
        List<HydrogenProduction> hps=countryAndProcessWise();
        List<String> cs=hydrogenProductionRepository.findDistinctByCountry();
        List<TypeWise> countries=new ArrayList<>();
        for(String t:cs){
            TypeWise newpt=new TypeWise();
            newpt.setTypeWise(t);
            double totalProductionCapacity = 0;
            double totalOutput = 0;
            for (HydrogenProduction hp : hps) {
                if (t.equals(hp.getCountry())) {
                    totalProductionCapacity += hp.getProductionCapacity();
                    totalOutput += hp.getOutput();
                }
            }
            newpt.setOutput(totalOutput);
            newpt.setProductionCapacity(totalProductionCapacity);
            countries.add(newpt);
        }
        return countries;
    }
}
