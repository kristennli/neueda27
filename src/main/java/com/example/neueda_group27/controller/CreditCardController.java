package com.example.neueda_group27.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.neueda_group27.model.CreditCard;
import com.example.neueda_group27.repository.CreditCardRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

@RestController
@RequestMapping("/api/creditcards")
public class CreditCardController {
    @Autowired
    private CreditCardRepository creditCardRepository;
    
    @Operation(summary = "Get all credit cards")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Found the credit cards"),
        @ApiResponse(responseCode = "404", description = "Credit cards not found")
    })

    @GetMapping
    public List<CreditCard> getAllCreditCards() {
        return creditCardRepository.findAll();
    }

    @Operation(summary = "Get a credit card by its card number")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Found the credit card"),
        @ApiResponse(responseCode = "404", description = "Credit card not found")
    })

    @GetMapping("/{cardNumber}")
    public CreditCard getCreditCardByCardNumber(@PathVariable String cardNumber) {
        return creditCardRepository.findByCardNumber(cardNumber).orElse(null);
    }
}
