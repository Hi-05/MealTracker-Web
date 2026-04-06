package com.example.MealTracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MealDto {

    private Long id;

    private String name ;

    private int energy ;

    private int protein ;

    private LocalDate date;


}
