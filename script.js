// Storing out transctions in an array

let transctions = [];
let nextId = 1;

function addTransaction() {
    console.log("In addTransactions function");
    // Get values from our form
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    // Validation checks
    if (description == null) {
        alert("Please enter a description!");
        return;
    }

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    // Transaction object
    const transction = {
        id: nextId++,
        description: description,
        amount: amount,
        type: type
    };

    console.log("The current transaction object" + transction.type);

    // Adding to list at the top (transactions = [];)
    transctions.push(transction);

    // Clear the form
    document.getElementById("description").value = '';
    document.getElementById("amount").value = '';

    // Update display summary screen

    // Update the summary
    updateSummary();
    // Update transactions on recent transactions list
    showTransactions();
    
}

function updateSummary() {
    let income = 0;
    let expenses = 0;

    // Loop through our list of transactions
    for (let i=0; i < transctions.length; i++) {
        if (transctions[i].type === 'Income') {
            income += transctions[i].amount;
            console.log("Income:" + income);
        } else {
            expenses += transctions[i].amount;
            console.log("Expenses:" + expenses);
        }
    }

    // Balance
    const balance = income - expenses;
    console.log(income +  "-" + expenses + "=" + balance);

    // Update the display
    document.getElementById('totalIncome').textContent = "R" + income;
    document.getElementById('totalExpenses').textContent = "R" + expenses;

    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = "R" + balance;

    console.log(balance);

    if (balance < 0) {
        balanceElement.className = "amount balance negative";
    } else {
        balanceElement.className = "amount balance";
    }
    
}

function showTransactions() {
    const container = document.getElementById('transactionsList');

    // If we have no transactions
    if (transctions.length === 0) {
        container.innerHTML = 
        '<div class="empty-message"> <p>No transactions yet. Add one above!</p></div>'
        return;
    }

    // Build html for all our transactions
    let html = '';
    for (let i = transctions.length - 1; i >= 0; i--) {
        const t = transctions[i];

        html += `
            <div class="transaction ${t.type}-item">
                <div class="transaction-info">
                    <strong>${t.description}</strong>
                    <small>${t.type}</small>
                </div>

                <div class="transaction-amount ${t.type}">
                    ${t.type === 'Income' ? + "+" : "-"}R${t.amount}
                </div>
                <button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button>
            </div>
    `;
}

    container.innerHTML = html;
}

function deleteTransaction(id) {
    // Find the specific transaction using ID and remove it
    for (let i=0; i < transctions.length; i++) {
        if (transctions[i].id === id) {
            transctions.splice(i, 1);
            break;
        }
    }

    //Update the display
    updateSummary();
    showTransactions();
}

updateSummary();
showTransactions();