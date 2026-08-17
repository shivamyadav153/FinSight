package com.financehub.backend.service;

import com.financehub.backend.entity.User;
import com.financehub.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final UserRepository userRepository;

  public AuthService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User register(User user) {

    if (userRepository.existsByEmail(user.getEmail())) {
      throw new RuntimeException("Email already registered");
    }

    return userRepository.save(user);
  }

  public User login(String email, String password) {

    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Invalid email or password"));

    if (!user.getPassword().equals(password)) {
      throw new RuntimeException("Invalid email or password");
    }

    return user;
  }
}
