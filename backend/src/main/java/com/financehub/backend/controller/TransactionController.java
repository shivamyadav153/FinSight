package com.financehub.backend.controller;

import com.financehub.backend.entity.Transaction;
import com.financehub.backend.service.TransactionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

  private final TransactionService transactionService;

  public TransactionController(
      TransactionService transactionService) {
    this.transactionService = transactionService;
  }

  // GET ALL
  @GetMapping
  public ResponseEntity<List<Transaction>> getAllTransactions() {

    return ResponseEntity.ok(
        transactionService.getAllTransactions());
  }

  // GET ONE
  @GetMapping("/{id}")
  public ResponseEntity<Transaction> getTransactionById(
      @PathVariable Long id) {

    return ResponseEntity.ok(
        transactionService.getTransactionById(id));
  }

  // POST
  @PostMapping
  public ResponseEntity<Transaction> addTransaction(
      @RequestBody Transaction transaction) {

    return ResponseEntity.ok(
        transactionService.addTransaction(transaction));
  }

  // PUT
  @PutMapping("/{id}")
  public ResponseEntity<Transaction> updateTransaction(
      @PathVariable Long id,
      @RequestBody Transaction transaction) {

    return ResponseEntity.ok(
        transactionService.updateTransaction(
            id,
            transaction));
  }

  // DELETE
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTransaction(
      @PathVariable Long id) {

    transactionService.deleteTransaction(id);

    return ResponseEntity.noContent().build();
  }
}