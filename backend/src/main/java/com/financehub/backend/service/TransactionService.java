package com.financehub.backend.service;

import com.financehub.backend.entity.Transaction;
import com.financehub.backend.entity.User;
import com.financehub.backend.repository.TransactionRepository;
import com.financehub.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

  private final TransactionRepository transactionRepository;
  private final UserRepository userRepository;

  public TransactionService(
      TransactionRepository transactionRepository,
      UserRepository userRepository) {

    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
  }

  public List<Transaction> getTransactionsByUser(Long userId) {
    return transactionRepository.findByUserId(userId);
  }

  public Transaction createTransaction(
      Transaction transaction,
      Long userId) {

    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    transaction.setUser(user);

    return transactionRepository.save(transaction);
  }

  public Optional<Transaction> getTransactionById(
      Long id,
      Long userId) {

    return transactionRepository
        .findByIdAndUserId(id, userId);
  }

  public Transaction updateTransaction(
      Long id,
      Transaction updatedTransaction,
      Long userId) {

    Transaction existing = transactionRepository
        .findByIdAndUserId(id, userId)
        .orElseThrow(() -> new RuntimeException("Transaction not found"));

    existing.setAmount(updatedTransaction.getAmount());
    existing.setCategory(updatedTransaction.getCategory());
    existing.setType(updatedTransaction.getType());
    existing.setDescription(updatedTransaction.getDescription());
    existing.setDate(updatedTransaction.getDate());

    return transactionRepository.save(existing);
  }

  public void deleteTransaction(
      Long id,
      Long userId) {

    Transaction transaction = transactionRepository
        .findByIdAndUserId(id, userId)
        .orElseThrow(() -> new RuntimeException("Transaction not found"));

    transactionRepository.delete(transaction);
  }
}