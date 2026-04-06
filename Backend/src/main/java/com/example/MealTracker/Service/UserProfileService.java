package com.example.MealTracker.Service;

import com.example.MealTracker.DTO.UserProfileDto;
import com.example.MealTracker.Entity.UserProfile;
import com.example.MealTracker.Mapper.UserProfileMapper;
import com.example.MealTracker.Repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserProfileMapper userProfileMapper;

    // Save a new goal (Auto-fills today's date if missing)
    public UserProfileDto createProfile(UserProfileDto dto) {
        if (dto.getEffectiveDate() == null) {
            dto.setEffectiveDate(LocalDate.now());
        }
        UserProfile profile = userProfileMapper.toEntity(dto);
        UserProfile savedProfile = userProfileRepository.save(profile);
        return userProfileMapper.toDto(savedProfile);
    }

    // Fetch the current active goals
    public UserProfileDto getCurrentProfile() {
        return userProfileRepository.findTopByOrderByEffectiveDateDesc()
                .map(userProfileMapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("No profile found. Please create one!"));
    }

    public UserProfileDto getProfileForDate(LocalDate date) {
        // The business logic lives here!
        UserProfile profile = userProfileRepository.findTopByEffectiveDateLessThanEqualOrderByEffectiveDateDesc(date);

        if (profile == null) {
            return null;
        }

        return userProfileMapper.toDto(profile);
    }
}