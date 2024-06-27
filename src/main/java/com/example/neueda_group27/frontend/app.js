document.addEventListener('DOMContentLoaded', () => {
    const accountForm = document.getElementById('accountForm');
    const checkBalanceBtn = document.getElementById('checkBalanceBtn');
    const accountResult = document.getElementById('accountResult');
    const balanceResult = document.getElementById('balanceResult');

    let cardNumber, cardHolderName, expiryDate, cvv, zipcode, balance;

    accountForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const cardNumber = document.getElementById('cardNumber').value;
        const cardHolderName = document.getElementById('cardHolderName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const zipcode = document.getElementById('zipcode').value;

        fetch('http://localhost:8080/api/creditcards/checkAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `cardNumber=${cardNumber}&cardHolderName=${cardHolderName}&expiryDate=${expiryDate}&cvv=${cvv}&zipcode=${zipcode}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                balance = data.balance;
                Toastify({
                    text: 'Account verified successfully!',
                    duration: 3000,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
                }).showToast();

                document.getElementById('accountInfo').style.display = 'none';
                document.getElementById('actions').style.display = 'block';
            } else {
                Toastify({
                    text: 'Invalid account details. Please try again.',
                    duration: 3000,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    backgroundColor: 'linear-gradient(to right, #ff0000, #ff5f6d)',
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Toastify({
                text: 'Error verifying account.',
                duration: 3000,
                close: true,
                gravity: 'top',
                position: 'right',
                backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
            }).showToast();
        });

        // Use checkAccount to get balance
        checkBalanceBtn.addEventListener('click', function () {
            balanceResult.innerText = `Balance: $${balance !== undefined ? balance : 'N/A'}`;
            balanceResult.style.display = 'block';
        });
    });
});