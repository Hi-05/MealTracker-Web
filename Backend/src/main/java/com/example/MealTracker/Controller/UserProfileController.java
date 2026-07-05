package com.example.MealTracker.Controller;

import com.example.MealTracker.DTO.UserProfileDto;
import com.example.MealTracker.Service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profiles")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @PostMapping
    public UserProfileDto createProfile(@RequestBody @Valid UserProfileDto dto) {
        return userProfileService.createProfile(dto);
    }

    @GetMapping("/current")
    public UserProfileDto getCurrentProfile() {
        return userProfileService.getCurrentProfile();
    }

    // FIX 1: Added the GET mapping endpoint
    @GetMapping("/date/{date}")
    // FIX 2: Changed return type to ResponseEntity<UserProfileDto>
    public ResponseEntity<UserProfileDto> getProfileForDate(@PathVariable @Valid String date){

        LocalDate parsedDate = LocalDate.parse(date);

        // FIX 3: Lowercase 'u' on userProfileService
        UserProfileDto dto = userProfileService.getProfileForDate(parsedDate);

        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }
}