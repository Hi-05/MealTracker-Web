package com.example.MealTracker.Controller;

import com.example.MealTracker.Entity.Users;
import com.example.MealTracker.Service.UserRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRegister {

    @Autowired
    private UserRegisterService userRegister ;

    @PostMapping("/register")
    public Users userRegister(@RequestBody Users user){

        return userRegister.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user){

        return userRegister.verify(user) ;
    }
}