package com.example.neueda_group27.config;

import com.example.neueda_group27.model.CreditCard;
import com.example.neueda_group27.repository.CreditCardRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration // Indicates that this class contains Spring configuration
public class DBInitializer_CreditCard {

    /*
     * Bean that initializes the database with sample credit cards.
     */
    @Bean
    CommandLineRunner initDatabase(CreditCardRepository cardRepository) {
        return args -> {
            // Create a list of sample credit cards
            var creditCards = List.of(
                    new CreditCard("1234-5678-9012-3456", "John Doe", "12/24", 123, 5000.0, 1000.0, 12345),
                    new CreditCard("9876-5432-1098-7654", "Jane Smith", "11/23", 456, 10000.0, 2500.0, 23456),
                    new CreditCard("4321-8765-2109-6543", "Alice Johnson", "10/22", 789, 7500.0, 3500.0, 34567)
            );
            // Save all credit cards to the database
            cardRepository.saveAll(creditCards);
        };
    }
}

