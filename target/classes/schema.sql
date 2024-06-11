CREATE TABLE IF NOT EXISTS credit_card (
    card_number VARCHAR(255) PRIMARY KEY,
    card_holder_name VARCHAR(255),
    expiry_date VARCHAR(255),
    cvv INT,
    credit_limit DOUBLE,
    balance DOUBLE,
    zipcode INT
);