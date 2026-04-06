package com.example.MealTracker.Controller;

import com.example.MealTracker.DTO.EnergyDto;
import com.example.MealTracker.DTO.MealDto;
import com.example.MealTracker.DTO.ProteinDto;
import com.example.MealTracker.Service.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/meals")
public class MealController {

    private final MealService mealService;

    @GetMapping()
    public List<MealDto> getAllMeals(){

        return mealService.getAllMeals();
    }

    @GetMapping("/date/{date}")
    public List<MealDto> getMealsByDate(@PathVariable @Validated LocalDate date){

        return mealService.getMealsByDate(date);
    }

    @PostMapping()
    public MealDto createNewMeal(@RequestBody @Validated MealDto mealDto){

        return mealService.createNewMeal(mealDto);
    }

    @PatchMapping("/{id}")
    public MealDto updateMeal(@PathVariable Long id,@RequestBody @Validated MealDto mealDto){

        return mealService.updateMeal(id,mealDto);
    }

    @DeleteMapping("/{id}")
    public void deleteMeal(@PathVariable @Validated Long id){

        mealService.deleteMeal(id);
    }

    @GetMapping("/energy")
    public List<EnergyDto> getAllEnergies(){

        return mealService.getAllEnergies();
    }

    @GetMapping("/protein")
    public List<ProteinDto> getAllProtein(){

        return mealService.getAllProtein();
    }
}
