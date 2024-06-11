package com.example.neueda_group27.repository;

import com.example.neueda_group27.model.CreditCard;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardRepository extends JpaRepository<CreditCard, Integer> {
    Optional<CreditCard> findByCardNumber(String cardNumber);
}