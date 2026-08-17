package com.financehub.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private BigDecimal amount;

  @Column(nullable = false)
  private String category;

  @Column(nullable = false)
  private String type;

  @Column(length = 500)
  private String description;

  @Column(nullable = false)
  private LocalDate date;

  public Transaction() {
  }

  public Transaction(
      Long id,
      BigDecimal amount,
      String category,
      String type,
      String description,
      LocalDate date) {
    this.id = id;
    this.amount = amount;
    this.category = category;
    this.type = type;
    this.description = description;
    this.date = date;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }
}