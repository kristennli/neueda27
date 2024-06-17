document.addEventListener('DOMContentLoaded', () => {
    const accountForm = document.getElementById('accountForm');
    const checkBalanceBtn = document.getElementById('checkBalanceBtn');
    const withdrawMoneyBtn = document.getElementById('withdrawMoneyBtn');
    const withdrawForm = document.getElementById('withdrawForm');
    const accountResult = document.getElementById('accountResult');
    const actionForms = document.getElementById('actionForms');
    const balanceResult = document.getElementById('balanceResult');

    let cardNumber, cardHolderName, expiryDate, cvv, zipcode, balance;

    accountForm.addEventListener('submit', function (event) {
        event.preventDefault();

      const cardNumber = document.getElementById('cardNumber').value;
      const cardHolderName = document.getElementById('cardHolderName').value;
      const expiryDate = document.getElementById('expiryDate').value;
      const  cvv = document.getElementById('cvv').value;
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
                    accountResult.innerText = 'Account verified successfully!';
                    alert('Account verified successfully!')
                    document.getElementById('accountInfo').style.display = 'none';
                    document.getElementById('actions').style.display = 'block';
                } else {
                    accountResult.innerText = 'Invalid account details. Please try again.';
                    alert('Invalid account details. Please try again.')
                }
            })
            .catch(error => {
                console.error('Error:', error);
                accountResult.innerText = 'Error verifying account.';
                alert('Error verifying account.')
            });

        // use checkAccount to get balance
        checkBalanceBtn.addEventListener('click', function () {
            balanceResult.innerText = `Balance: $${balance !== undefined ? balance : 'N/A'}`;
            balanceResult.style.display = 'block';
            // withdrawForm.style.display = 'none';
        });
    });

    // withdrawMoneyBtn.addEventListener('click', function () {
    //     withdrawForm.style.display = 'block';
    //     balanceResult.style.display = 'none';
    // });

    // withdrawForm.addEventListener('submit', function (event) {
    //     event.preventDefault();

    //     const withdrawAmount = document.getElementById('withdrawAmount').value;

    //     fetch('http://localhost:8080/api/creditcards/withdraw', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         body: `cardNumber=${cardNumber}&cardHolderName=${cardHolderName}&expiryDate=${expiryDate}&cvv=${cvv}&zipcode=${zipcode}&amount=${withdrawAmount}`
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 balanceResult.innerText = 'Withdrawal successful!';
    //             } else {
    //                 balanceResult.innerText = 'Withdrawal failed. Please try again.';
    //             }
    //             balanceResult.style.display = 'block';
    //             withdrawForm.style.display = 'none';
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             balanceResult.innerText = 'Error processing withdrawal.';
    //             balanceResult.style.display = 'block';
    //         });
    // });
});