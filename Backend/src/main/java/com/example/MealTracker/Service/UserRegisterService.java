package com.example.MealTracker.Service;

import com.example.MealTracker.Entity.Users;
import com.example.MealTracker.Repository.UsersRepo;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserRegisterService {

    @Autowired
    AuthenticationManager authManager ;
    @Autowired
    private UsersRepo repo ;

    @Autowired
    private JWTService jwtService ;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder() ;

    public Users register(Users user){

        if(repo.findByUsername(user.getUsername()) != null){
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Username already exists"
            );
        }

        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public String verify(Users user) {
        Authentication authentication =
                authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword()));

        if(authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());
        }

        return "Failed" ;
    }
}
