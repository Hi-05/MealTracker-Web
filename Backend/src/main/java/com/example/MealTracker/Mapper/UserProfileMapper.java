package com.example.MealTracker.Mapper;

import com.example.MealTracker.DTO.UserProfileDto;
import com.example.MealTracker.Entity.UserProfile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserProfileMapper {
    // REMOVED 'static' HERE
    UserProfileDto toDto(UserProfile userProfile);
    UserProfile toEntity(UserProfileDto userProfileDto);
}