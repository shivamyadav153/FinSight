package com.financehub.backend.security;

import com.financehub.backend.security.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;

  public JwtAuthenticationFilter(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain)
      throws ServletException, IOException {

    // Get Authorization header
    String authHeader = request.getHeader("Authorization");

    // If token is not present, continue request
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    // Remove "Bearer " from token
    String token = authHeader.substring(7);

    try {

      // Check token
      if (jwtService.isTokenValid(token)) {

        // Get user ID from JWT
        Long userId = jwtService.extractUserId(token);

        // Create authentication object
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            userId,
            null,
            Collections.emptyList());

        // Add request details
        authentication.setDetails(
            new WebAuthenticationDetailsSource()
                .buildDetails(request));

        // Set authenticated user
        SecurityContextHolder
            .getContext()
            .setAuthentication(authentication);
      }

    } catch (Exception e) {

      // Invalid token
      SecurityContextHolder.clearContext();
    }

    // Continue request
    filterChain.doFilter(request, response);
  }
}