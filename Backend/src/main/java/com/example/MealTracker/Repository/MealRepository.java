package com.example.MealTracker.Repository;

import com.example.MealTracker.Entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MealRepository extends JpaRepository<Meal , Long> {


    // Fetch all meals for a specific user
    List<Meal> findByUser_Id(Long userId);

    // Fetch meals for a specific user on a specific date
    List<Meal> findByUser_IdAndDate(Long userId, LocalDate date);
}
