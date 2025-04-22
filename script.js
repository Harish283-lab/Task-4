const amountInput = document.querySelectorAll("input")[1]; // Amount input
const typeInput = document.getElementById("city"); // Income/Expense type
const addButton = document.querySelectorAll("button")[0]; // Add Entry
const resetButton = document.querySelectorAll("button")[1]; // Reset All

// Display fields
const totalIncomeEl = document.querySelectorAll("p")[1];
const totalExpenseEl = document.querySelectorAll("p")[3];
const netBalanceEl = document.querySelectorAll("p")[5];

// Initialize totals
let totalIncome = 0;
let totalExpense = 0;

function updateDisplay() {
    totalIncomeEl.textContent = `$${totalIncome}`;
    totalExpenseEl.textContent = `$${totalExpense}`;
    const netBalance = totalIncome - totalExpense;
    netBalanceEl.textContent = `$${netBalance}`;
}

addButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value.toLowerCase();

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (type === "income") {
        totalIncome += amount;
    } else if (type === "outcome") {
        totalExpense += amount;
    } else {
        alert("Please select a valid type: Income or Outcome.");
        return;
    }

    updateDisplay();

    // Clear inputs
    amountInput.value = "";
    typeInput.value = "";
});

resetButton.addEventListener("click", () => {
    totalIncome = 0;
    totalExpense = 0;
    updateDisplay();
});
