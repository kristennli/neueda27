package com.example.neueda_group27.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.neueda_group27.model.CreditCard;
import com.example.neueda_group27.repository.CreditCardRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/creditcards")
public class CreditCardController {
    @Autowired
    private CreditCardRepository creditCardRepository;

    @GetMapping
    public List<CreditCard> getAllCreditCards() {
        return creditCardRepository.findAll();
    }

    // updated response to include balance
    @PostMapping("/checkAccount")
    public ResponseEntity<?> checkAccount(@RequestParam String cardNumber, @RequestParam String cardHolderName, @RequestParam String expiryDate, @RequestParam int cvv, @RequestParam int zipcode) {
        CreditCard creditCard = creditCardRepository.findByCardNumber(cardNumber).orElse(null);
        Map<String, Object> response = new HashMap<>();
        if (creditCard != null && creditCard.getCardHolderName().equals(cardHolderName) && creditCard.getExpiryDate().equals(expiryDate) && creditCard.getCvv() == cvv && creditCard.getZipcode() == zipcode) {
            response.put("success", true);
            response.put("balance", creditCard.getBalance());
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid account details");
            return ResponseEntity.badRequest().body(response);
        }
    }    
}
