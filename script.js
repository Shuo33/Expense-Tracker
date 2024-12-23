const balance = document.getElementById('balance');
const money_plus = document.getElementById('money_plus');
const money_minus = document.getElementById('money_minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// const dummyTransaction = [
//     { id: 1, text: 'Flower', amount: -20 }, 
//     { id: 2, text: 'Salary', amount: 300 }, 
//     { id: 3, text: 'Book', amount: -10 }, 
//     { id: 4, text: 'Camera', amount: 150 }, 
// ];



// check if there's sth in the local storage, then set it to the 'localStorageTransaction', or, just set it to an empty array
let transactions = localStorage.getItem('transactions') !== null ? JSON.parse(localStorage.getItem('transactions')) : []; 


// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}



// Add transaction
function addTransaction(e) {
    e.preventDefault(); 

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateBalance(); 

        updateLocalStorage();

        // clean up the form: text & amount
        text.value = '';
        amount.value = ''; 
    }
    
}



// Generat random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}




// Add transaction to DOM
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+'; 

    const li = document.createElement('li'); 

    // Add class based on value
    li.classList.add(transaction.amount < 0 ? 'minus' : 'plus'); 

    li.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}$</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(li);
}



// Remove transaction with it's ID
function removeTransaction(id) {
    transactions = transactions.filter(item => item.id !== id);

    updateLocalStorage();
    
    init();
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


form.addEventListener('submit', addTransaction);