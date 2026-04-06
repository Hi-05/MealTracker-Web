package com.example.MealTracker.Repository;

import com.example.MealTracker.Entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    // Grabs the single most recent active goal profile
    Optional<UserProfile> findTopByOrderByEffectiveDateDesc();

    UserProfile findTopByEffectiveDateLessThanEqualOrderByEffectiveDateDesc(LocalDate date);
}