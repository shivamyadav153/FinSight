package com.financehub.backend.repository;

import com.financehub.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository
    extends JpaRepository<Transaction, Long> {

  List<Transaction> findByUserId(Long userId);

  Optional<Transaction> findByIdAndUserId(Long id, Long userId);
}