// package com.mockinterview.mockinterview.controller;

// import java.util.HashMap;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.mockinterview.mockinterview.dto.AuthRequest;
// import com.mockinterview.mockinterview.model.User;
// import com.mockinterview.mockinterview.repository.UserRepository;
// import com.mockinterview.mockinterview.service.JwtService;

// @RestController
// @RequestMapping("/api")
// public class AuthController {

//     @Autowired
//     private JwtService jwtService;

//     @Autowired
//     private AuthenticationManager authenticationManager;

//     @Autowired
//     private UserRepository userRepository;

//     @GetMapping("/home")
//     public String Home() {
//         return "Initial Render Page.!";
//     }

//     @PostMapping("/login")
//     public ResponseEntity<Map<String, Object>> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
//         Authentication authentication = authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
//         if (authentication.isAuthenticated()) {

//             UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//             String userRole = userDetails.getAuthorities().iterator().next().getAuthority();

//             String jwtToken = jwtService.generateToken(authRequest.getEmail());

//             // Fetch the user from the database using the email
//             User user = userRepository.findByEmail(authRequest.getEmail())
//                 .orElseThrow(() -> new UsernameNotFoundException("User not found"));

//             // Prepare the response model
//             Map<String, Object> responseModel = new HashMap<>();
//             responseModel.put("token", jwtToken);
//             responseModel.put("role", userRole);
//             responseModel.put("email", authRequest.getEmail());
//             responseModel.put("userId", user.getId());// Add user ID to the response

//             return ResponseEntity.ok(responseModel);

//         } else {
//             throw new UsernameNotFoundException("Invalid user request!");
//         }
//     }
// }
package com.mockinterview.mockinterview.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.mockinterview.mockinterview.dto.AuthRequest;
import com.mockinterview.mockinterview.model.User;
import com.mockinterview.mockinterview.repository.UserRepository;
import com.mockinterview.mockinterview.service.JwtService;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/home")
    public String home() {
        return "Initial Render Page!";
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            // Authenticate user credentials
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            if (authentication.isAuthenticated()) {
                // Fetch user details and role
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                String userRole = userDetails.getAuthorities().iterator().next().getAuthority();
                String jwtToken = jwtService.generateToken(authRequest.getEmail());

                // Fetch user entity for additional details
                User user = userRepository.findByEmail(authRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                // Prepare response model
                Map<String, Object> responseModel = new HashMap<>();
                responseModel.put("token", jwtToken);
                responseModel.put("role", userRole);
                responseModel.put("email", authRequest.getEmail());
                responseModel.put("userId", user.getId());
                responseModel.put("message", "Login successful");

                return ResponseEntity.ok(responseModel);
            } else {
                throw new UsernameNotFoundException("Invalid credentials");
            }
        } catch (BadCredentialsException ex) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    // Handle BadCredentialsException globally
    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleBadCredentialsException(BadCredentialsException ex) {
        return Map.of("error", "Authentication failed", "details", ex.getMessage());
    }

    // Handle other exceptions globally
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handleGlobalException(Exception ex) {
        return Map.of("error", "Something went wrong", "details", ex.getMessage());
    }
}
