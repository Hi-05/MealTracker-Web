package com.example.MealTracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MealDto {
//
//    private Long id;

    @NotBlank(message = "Meal name cannot be empty")
    private String name ;

    @Min(value = 0, message = "Energy cannot be negative")
    private int energy ;

    @Min(value = 0, message = "Protein cannot be negative")
    private int protein ;

    @NotNull(message = "Date is required")
    private LocalDate date;


}
