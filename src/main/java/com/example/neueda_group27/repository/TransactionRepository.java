package com.example.neueda_group27.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.neueda_group27.model.Transaction;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByCardNumber(String cardNumber);
}