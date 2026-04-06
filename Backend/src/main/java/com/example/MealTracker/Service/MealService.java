package com.example.MealTracker.Service;


import com.example.MealTracker.DTO.EnergyDto;
import com.example.MealTracker.DTO.MealDto;
import com.example.MealTracker.DTO.ProteinDto;
import com.example.MealTracker.Entity.Meal;
import com.example.MealTracker.Mapper.MealMapper;
import com.example.MealTracker.Repository.MealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;
    private final MealMapper mealMapper ;

    public List<MealDto> getAllMeals() {

        List<Meal> meals = mealRepository.findAll();
        return meals.stream()
                .map(mealMapper::toDto)
                .toList();
    }

    public List<MealDto> getMealsByDate(LocalDate date) {

        List<Meal> meals = mealRepository.findByDate(date) ;
        return meals.stream()
                .map(mealMapper::toDto)
                .toList();
    }

    public MealDto createNewMeal(MealDto mealDto) {

        if (mealDto.getDate() == null) {
            mealDto.setDate(LocalDate.now());
        }
        Meal NewMeal = mealMapper.toEntity(mealDto);
        Meal meal= mealRepository.save(NewMeal);
        return mealMapper.toDto(meal) ;
    }

    public MealDto updateMeal(Long id,MealDto mealDto) {

       Meal meal = mealRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("meal not found")) ;
       mealMapper.updateMealFromDto(mealDto , meal);
       Meal updatedMeal = mealRepository.save(meal);
       return mealMapper.toDto(updatedMeal) ;
    }

    public void deleteMeal(Long id) {

        if(!mealRepository.existsById(id)){
            throw new IllegalArgumentException("meal not found") ;
        }
        mealRepository.deleteById(id);
    }


    public List<EnergyDto> getAllEnergies() {

        List<Meal> meals = mealRepository.findAll();
        return meals.stream()
                                        .map(mealMapper::toEnergy)
                                        .toList();

    }

    public List<ProteinDto> getAllProtein() {

        List<Meal> meals = mealRepository.findAll();
        return meals.stream()
                .map(mealMapper::toProtein)
                .toList() ;

    }
}
