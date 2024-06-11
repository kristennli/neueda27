package com.example.neueda_group27.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.neueda_group27.model.CreditCard;
import com.example.neueda_group27.repository.CreditCardRepository;
import java.util.List;

@RestController
@RequestMapping("/api/creditcard")
public class CreditCardController {
    @Autowired
    private CreditCardRepository creditCardRepository;

    @GetMapping
    public List<CreditCard> getAllCreditCards() {
        return creditCardRepository.findAll();
    }

    @GetMapping("/{cardNumber}")
    public CreditCard getCreditCardByCardNumber(@PathVariable String cardNumber) {
        return creditCardRepository.findByCardNumber(cardNumber).orElse(null);
    }
}
