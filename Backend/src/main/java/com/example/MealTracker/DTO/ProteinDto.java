package com.example.MealTracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProteinDto {

    private Long id;
    private String name ;
    private int protein ;
    private LocalDate date;
}
