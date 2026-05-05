package com.example.MealTracker.Repository;

import com.example.MealTracker.Entity.UserProfile;
import com.example.MealTracker.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    // --- EXACT CHANGES TO ADD (Note the 'ByUser' addition) ---
    Optional<UserProfile> findTopByUserOrderByEffectiveDateDesc(Users user);

    UserProfile findTopByUserAndEffectiveDateLessThanEqualOrderByEffectiveDateDesc(Users user, LocalDate date);
}