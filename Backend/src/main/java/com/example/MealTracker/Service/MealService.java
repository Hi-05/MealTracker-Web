package com.example.MealTracker.Service;

import com.example.MealTracker.DTO.MealDto;
import com.example.MealTracker.DTO.EnergyDto; // Added missing import
import com.example.MealTracker.DTO.ProteinDto; // Added missing import
import com.example.MealTracker.Entity.Meal;
import com.example.MealTracker.Entity.Users;
import com.example.MealTracker.Mapper.MealMapper;
import com.example.MealTracker.Repository.MealRepository;
import com.example.MealTracker.Repository.UsersRepo;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;
    private final MealMapper mealMapper;
    private final UsersRepo usersRepo;

    // ==========================================
    // SECURITY HELPER: Get the logged-in user
    // ==========================================
    private Users getAuthenticatedUser() {
        String username = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        Users user = usersRepo.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("Authenticated user not found in database");
        }
        return user;
    }

    // ==========================================
    // CREATE
    // ==========================================
    public MealDto createNewMeal(MealDto mealDto) {
        Users currentUser = getAuthenticatedUser();

        // Default to today if frontend doesn't send a date
        if (mealDto.getDate() == null) {
            mealDto.setDate(LocalDate.now());
        }

        Meal newMeal = mealMapper.toEntity(mealDto);

        // SECURE: Link the meal directly to the JWT owner
        newMeal.setUser(currentUser);

        Meal savedMeal = mealRepository.save(newMeal);
        return mealMapper.toDto(savedMeal);
    }

    // ==========================================
    // READ (All Meals for this User)
    // ==========================================
    public List<MealDto> getAllMeals() {
        Users currentUser = getAuthenticatedUser();

        // SECURE: Only fetch meals linked to this user's ID
        List<Meal> meals = mealRepository.findByUser_Id(currentUser.getId());

        return meals.stream()
                .map(mealMapper::toDto)
                .collect(Collectors.toList());
    }

    // ==========================================
    // READ (Meals by Date for this User)
    // ==========================================
    public List<MealDto> getMealsByDate(LocalDate date) {
        Users currentUser = getAuthenticatedUser();

        // SECURE: Only fetch meals for this user ON this date
        List<Meal> meals = mealRepository.findByUser_IdAndDate( currentUser.getId(), date);

        return meals.stream()
                .map(mealMapper::toDto)
                .collect(Collectors.toList());
    }

    // ==========================================
    // UPDATE
    // ==========================================
    public MealDto updateMeal(Long mealId, MealDto mealDto) {
        Users currentUser = getAuthenticatedUser();

        // 1. Find the meal
        Meal existingMeal = mealRepository.findById(mealId)
                .orElseThrow(() -> new IllegalArgumentException("Meal not found with id: " + mealId));

        // 2. SECURE: Check if the current user owns this meal before updating
        if (!existingMeal.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized: You do not have permission to modify this meal");
        }

        // 3. Apply updates
        existingMeal.setName(mealDto.getName());
        existingMeal.setEnergy(mealDto.getEnergy());
        existingMeal.setProtein(mealDto.getProtein());

        Meal updatedMeal = mealRepository.save(existingMeal);
        return mealMapper.toDto(updatedMeal);
    }

    // ==========================================
    // DELETE (Fixed: Only one copy now)
    // ==========================================
    public void deleteMeal(Long mealId) {
        Users currentUser = getAuthenticatedUser();

        // 1. Find the meal
        Meal existingMeal = mealRepository.findById(mealId)
                .orElseThrow(() -> new IllegalArgumentException("Meal not found with id: " + mealId));

        // 2. SECURE: Check if the current user owns this meal before deleting
        if (!existingMeal.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized: You do not have permission to modify this meal");
        }

        // 3. Delete it
        mealRepository.delete(existingMeal);
    }

    // ==========================================
    // READ ENERGIES (Secure)
    // ==========================================
    public List<EnergyDto> getAllEnergies() {
        Users currentUser = getAuthenticatedUser();

        // SECURE: Only fetch meals for this user
        List<Meal> meals = mealRepository.findByUser_Id( currentUser.getId());

        return meals.stream()
                .map(mealMapper::toEnergy)
                .collect(Collectors.toList());
    }

    // ==========================================
    // READ PROTEIN (Secure)
    // ==========================================
    public List<ProteinDto> getAllProtein() {
        Users currentUser = getAuthenticatedUser();

        // SECURE: Only fetch meals for this user
        List<Meal> meals = mealRepository.findByUser_Id(currentUser.getId());

        return meals.stream()
                .map(mealMapper::toProtein)
                .collect(Collectors.toList());
    }
}
