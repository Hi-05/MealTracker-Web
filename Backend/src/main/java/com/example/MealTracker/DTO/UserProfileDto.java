package com.example.MealTracker.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UserProfileDto {

    private Long id;

    private String name;

    @NotNull(message = "Target energy is required")
    @Min(value = 0, message = "Target energy cannot be negative")
    private Integer targetEnergy;

    @NotNull(message = "Target protein is required")
    @Min(value = 0, message = "Target protein cannot be negative")
    private Integer targetProtein;

    private LocalDate effectiveDate;
}