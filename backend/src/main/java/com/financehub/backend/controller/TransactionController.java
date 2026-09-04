package com.financehub.backend.controller;

import com.financehub.backend.entity.Transaction;
import com.financehub.backend.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://shivamyadav153.github.io"
})
public class TransactionController {

  private final TransactionService transactionService;

  public TransactionController(TransactionService transactionService) {
    this.transactionService = transactionService;
  }

  // GET ALL TRANSACTIONS OF LOGGED-IN USER
  @GetMapping
  public ResponseEntity<List<Transaction>> getTransactions(
      Authentication authentication) {

    Long userId = (Long) authentication.getPrincipal();

    return ResponseEntity.ok(
        transactionService.getTransactionsByUser(userId));
  }

  // GET ONE TRANSACTION
  @GetMapping("/{id}")
  public ResponseEntity<Transaction> getTransaction(
      @PathVariable Long id,
      Authentication authentication) {

    Long userId = (Long) authentication.getPrincipal();

    return transactionService
        .getTransactionById(id, userId)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  // CREATE TRANSACTION
  @PostMapping
  public ResponseEntity<Transaction> createTransaction(
      @RequestBody Transaction transaction,
      Authentication authentication) {

    Long userId = (Long) authentication.getPrincipal();

    return ResponseEntity.ok(
        transactionService.createTransaction(
            transaction,
            userId));
  }

  // UPDATE TRANSACTION
  @PutMapping("/{id}")
  public ResponseEntity<Transaction> updateTransaction(
      @PathVariable Long id,
      @RequestBody Transaction transaction,
      Authentication authentication) {

    Long userId = (Long) authentication.getPrincipal();

    return ResponseEntity.ok(
        transactionService.updateTransaction(
            id,
            transaction,
            userId));
  }

  // DELETE TRANSACTION
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTransaction(
      @PathVariable Long id,
      Authentication authentication) {

    Long userId = (Long) authentication.getPrincipal();

    transactionService.deleteTransaction(id, userId);

    return ResponseEntity.noContent().build();
  }
}