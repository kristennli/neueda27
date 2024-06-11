document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/api/creditcards')
        .then(response => response.json())
        .then(creditCards => {
            const creditCardList = document.getElementById('credit-card-list');
            creditCards.forEach(creditCard => {
                const creditCardDiv = document.createElement('div');
                creditCardDiv.className = 'credit-card';
                creditCardDiv.innerHTML = `
                    <h2>${creditCard.cardHolderName}</h2>
                    <p>Card Number: ${creditCard.cardNumber}</p>
                    <p>Expiry Date: ${creditCard.expiryDate}</p>
                    <p>CVV: ${creditCard.cvv}</p>
                    <p>Credit Limit: $${creditCard.creditLimit}</p>
                    <p>Balance: $${creditCard.balance}</p>
                `;
                creditCardList.appendChild(creditCardDiv);
            });
        })
        .catch(error => console.error('Error fetching credit cards:', error));
});