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

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var cardNumber = document.getElementById('cardNumber').value;
    var cardHolderName = document.getElementById('cardHolderName').value;
    var expiryDate = document.getElementById('expiryDate').value;
    var cvv = document.getElementById('cvv').value;
    var zipcode = document.getElementById('zipcode').value;

    fetch('http://localhost:8080/api/creditcards/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `cardNumber=${cardNumber}&cardHolderName=${cardHolderName}&expiryDate=${expiryDate}&cvv=${cvv}&zipcode=${zipcode}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('accountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var cardNumber = document.getElementById('cardNumberCheck').value;
    var cardHolderName = document.getElementById('cardHolderNameCheck').value;
    var expiryDate = document.getElementById('expiryDate').value;
    var cvv = document.getElementById('cvvCheck').value;
    var zipcode = document.getElementById('zipcodeCheck').value;

    fetch('http://localhost:8080/api/creditcards/checkAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `cardNumber=${cardNumber}&cardHolderName=${cardHolderName}&expiryDate=${expiryDate}&cvv=${cvv}&zipcode=${zipcode}`
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = `Balance: ${data}`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Invalid account details');
    });
});