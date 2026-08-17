package com.financehub.backend.service;

import com.financehub.backend.entity.Transaction;
import com.financehub.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

  private final TransactionRepository transactionRepository;

  public TransactionService(
      TransactionRepository transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  // GET ALL
  public List<Transaction> getAllTransactions() {
    return transactionRepository.findAll();
  }

  // GET BY ID
  public Transaction getTransactionById(Long id) {

    return transactionRepository.findById(id)
        .orElseThrow(() -> new RuntimeException(
            "Transaction not found with id: " + id));
  }

  // ADD
  public Transaction addTransaction(Transaction transaction) {

    transaction.setId(null);

    return transactionRepository.save(transaction);
  }

  // UPDATE
  public Transaction updateTransaction(
      Long id,
      Transaction updatedTransaction) {

    Transaction existingTransaction = transactionRepository.findById(id)
        .orElseThrow(() -> new RuntimeException(
            "Transaction not found with id: " + id));

    existingTransaction.setAmount(
        updatedTransaction.getAmount());

    existingTransaction.setCategory(
        updatedTransaction.getCategory());

    existingTransaction.setType(
        updatedTransaction.getType());

    existingTransaction.setDescription(
        updatedTransaction.getDescription());

    existingTransaction.setDate(
        updatedTransaction.getDate());

    return transactionRepository.save(
        existingTransaction);
  }

  // DELETE
  public void deleteTransaction(Long id) {

    if (!transactionRepository.existsById(id)) {

      throw new RuntimeException(
          "Transaction not found with id: " + id);
    }

    transactionRepository.deleteById(id);
  }
}