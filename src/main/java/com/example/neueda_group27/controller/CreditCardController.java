package com.example.neueda_group27.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.neueda_group27.model.CreditCard;
import com.example.neueda_group27.repository.CreditCardRepository;

import java.util.List;

@RestController
@RequestMapping("/api/creditcards")
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

    @PostMapping("/verify")
    public String verifyPayment(@RequestParam String cardNumber, @RequestParam String cardHolderName, @RequestParam String expiryDate, @RequestParam int cvv, @RequestParam int zipcode) {
        CreditCard creditCard = creditCardRepository.findByCardNumber(cardNumber).orElse(null);
        if (creditCard != null && creditCard.getCardHolderName().equals(cardHolderName) && creditCard.getExpiryDate().equals(expiryDate) && creditCard.getCvv() == cvv && creditCard.getZipcode() == zipcode) {
            return "Success payment";
        } else {
            return "Invalid payment details";
        }
    }

    @PostMapping("/checkAccount")
    public double checkAccount(@RequestParam String cardNumber, @RequestParam String cardHolderName, @RequestParam String expiryDate, @RequestParam int cvv, @RequestParam int zipcode) {
        CreditCard creditCard = creditCardRepository.findByCardNumber(cardNumber).orElse(null);
        if (creditCard != null && creditCard.getCardHolderName().equals(cardHolderName) && creditCard.getExpiryDate().equals(expiryDate) && creditCard.getCvv() == cvv && creditCard.getZipcode() == zipcode) {
            return creditCard.getBalance();
        } else {
            throw new RuntimeException("Invalid account details");
        }
    }
}
