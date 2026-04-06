package com.example.MealTracker.Mapper;

import com.example.MealTracker.DTO.MealDto;
import com.example.MealTracker.DTO.EnergyDto;
import com.example.MealTracker.DTO.ProteinDto;
import com.example.MealTracker.Entity.Meal;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface MealMapper {

    MealDto toDto(Meal meal);

    Meal toEntity(MealDto mealDto);

    EnergyDto toEnergy(Meal meal) ;

    ProteinDto toProtein(Meal meal) ;


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true) // SDE Security Rule: Never overwrite the DB ID!
    void updateMealFromDto(MealDto mealDto, @MappingTarget Meal meal);
}
