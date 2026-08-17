package com.financehub.backend.controller;

import com.financehub.backend.entity.User;
import com.financehub.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

  private final UserRepository userRepository;

  public AuthController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  // =========================
  // REGISTER
  // =========================

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody User user) {

    if (user.getName() == null || user.getName().trim().isEmpty()) {
      return ResponseEntity.badRequest()
          .body(Map.of("message", "Name is required"));
    }

    if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
      return ResponseEntity.badRequest()
          .body(Map.of("message", "Email is required"));
    }

    if (user.getPassword() == null || user.getPassword().length() < 6) {
      return ResponseEntity.badRequest()
          .body(Map.of(
              "message",
              "Password must be at least 6 characters"));
    }

    String email = user.getEmail().trim().toLowerCase();

    if (userRepository.existsByEmail(email)) {
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body(Map.of(
              "message",
              "Email already registered"));
    }

    user.setEmail(email);

    User savedUser = userRepository.save(user);

    Map<String, Object> userResponse = new HashMap<>();

    userResponse.put("id", savedUser.getId());
    userResponse.put("name", savedUser.getName());
    userResponse.put("email", savedUser.getEmail());

    Map<String, Object> response = new HashMap<>();

    response.put("message", "Registration successful");
    response.put("user", userResponse);

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(response);
  }

  // =========================
  // LOGIN
  // =========================

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody User loginUser) {

    if (loginUser.getEmail() == null ||
        loginUser.getEmail().trim().isEmpty()) {

      return ResponseEntity.badRequest()
          .body(Map.of(
              "message",
              "Email is required"));
    }

    if (loginUser.getPassword() == null ||
        loginUser.getPassword().isEmpty()) {

      return ResponseEntity.badRequest()
          .body(Map.of(
              "message",
              "Password is required"));
    }

    String email = loginUser.getEmail()
        .trim()
        .toLowerCase();

    User user = userRepository
        .findByEmail(email)
        .orElse(null);

    if (user == null) {
      return ResponseEntity
          .status(HttpStatus.UNAUTHORIZED)
          .body(Map.of(
              "message",
              "Invalid email or password"));
    }

    if (!user.getPassword()
        .equals(loginUser.getPassword())) {

      return ResponseEntity
          .status(HttpStatus.UNAUTHORIZED)
          .body(Map.of(
              "message",
              "Invalid email or password"));
    }

    Map<String, Object> userResponse = new HashMap<>();

    userResponse.put("id", user.getId());
    userResponse.put("name", user.getName());
    userResponse.put("email", user.getEmail());

    Map<String, Object> response = new HashMap<>();

    response.put("message", "Login successful");
    response.put("user", userResponse);

    return ResponseEntity.ok(response);
  }
}