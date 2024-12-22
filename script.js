const balance = document.getElementById('balance');
const money_plus = document.getElementById('money_plus');
const money_minus = document.getElementById('money_minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const dummyTransaction = [
    { id: 1, text: 'Flower', amount: -20 }, 
    { id: 2, text: 'Salary', amount: 300 }, 
    { id: 3, text: 'Book', amount: -10 }, 
    { id: 4, text: 'Camera', amount: 150 }, 
];

let transactions = dummyTransaction; 

// Add transaction to DOM
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+'; 

    const li = document.createElement('li'); 

    // Add class based on value
    li.classList.add(transaction.amount < 0 ? 'minus' : 'plus'); 

    li.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}$</span> <button class="delete-btn">x</button>
    `;

    list.appendChild(li);
}





// Update the balance, income and expense
function updateBalance() {
    // creat an array with all amounts from the transactions
    const amounts = transactions.map(item =>
        item.amount
    );

    const total = amounts.reduce((acc, item) => (acc + item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc + item), 0)
        .toFixed(2);
    
    // get the positive value of the expense
    const expense =
        ( amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc + item), 0) * -1 ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}





// Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(item => {
        addTransactionDOM(item);
    }); 

    updateBalance();

}

init();