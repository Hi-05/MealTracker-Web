package com.example.MealTracker.Service;

import com.example.MealTracker.DTO.UserProfileDto;
import com.example.MealTracker.Entity.UserProfile;
import com.example.MealTracker.Entity.Users;
import com.example.MealTracker.Mapper.UserProfileMapper;
import com.example.MealTracker.Repository.UserProfileRepository;
import com.example.MealTracker.Repository.UsersRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserProfileMapper userProfileMapper;
    private final UsersRepo usersRepo; // Add this!

    // --- SECURITY HELPER ---
    private Users getAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = usersRepo.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return user;
    }

    public UserProfileDto createProfile(UserProfileDto dto) {
        Users currentUser = getAuthenticatedUser();

        if (dto.getEffectiveDate() == null) {
            dto.setEffectiveDate(LocalDate.now());
        }
        UserProfile profile = userProfileMapper.toEntity(dto);

        // SECURE: Link the profile to the user!
        profile.setUser(currentUser);

        UserProfile savedProfile = userProfileRepository.save(profile);
        return userProfileMapper.toDto(savedProfile);
    }

    public UserProfileDto getCurrentProfile() {
        Users currentUser = getAuthenticatedUser();

        // Fetch only THIS user's profile
        return userProfileRepository.findTopByUserOrderByEffectiveDateDesc(currentUser)
                .map(userProfileMapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("No profile found. Please create one!"));
    }

    public UserProfileDto getProfileForDate(LocalDate date) {
        Users currentUser = getAuthenticatedUser();

        // Fetch only THIS user's profile for the date
        UserProfile profile = userProfileRepository.findTopByUserAndEffectiveDateLessThanEqualOrderByEffectiveDateDesc(currentUser, date);

        if (profile == null) {
            return null;
        }

        return userProfileMapper.toDto(profile);
    }
}