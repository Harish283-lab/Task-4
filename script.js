

const descriptionInput = document.querySelectorAll("input")[0];
const amountInput = document.querySelectorAll("input")[1];
const typeInput = document.getElementById("city");
const addButton = document.querySelectorAll("button")[0];
const resetButton = document.querySelectorAll("button")[1];
const radioButtons = document.querySelectorAll("input[type='radio']");
const entriesSection = document.createElement("div");
document.querySelector("section").appendChild(entriesSection);

const totalIncomeEl = document.querySelectorAll("p")[1];
const totalExpenseEl = document.querySelectorAll("p")[3];
const netBalanceEl = document.querySelectorAll("p")[5];

let totalIncome = 0;
let totalExpense = 0;
let entries = [];
let editIndex = null;

function updateDisplay() {
    totalIncomeEl.textContent = `$${totalIncome}`;
    totalExpenseEl.textContent = `$${totalExpense}`;
    netBalanceEl.textContent = `$${totalIncome - totalExpense}`;
}

function renderEntries() {
    entriesSection.innerHTML = "";
    const selectedFilter = [...radioButtons].find(rb => rb.checked).value;

    entries
        .filter(entry => {
            if (selectedFilter === "1") return true; // All
            if (selectedFilter === "2") return entry.type === "income";
            if (selectedFilter === "3") return entry.type === "expense";
        })
        .forEach((entry, index) => {
            const entryDiv = document.createElement("div");
            entryDiv.className = "border p-3 m-2 rounded-md bg-gray-100 flex justify-between items-center";
            entryDiv.innerHTML = `
                <div>
                    <p><strong>${entry.description}</strong></p>
                    <p>$${entry.amount} - ${entry.type}</p>
                </div>
                <div class="space-x-2">
                    <button class="edit-btn bg-blue-500 text-white px-2 py-1 rounded" data-index="${index}">Edit</button>
                    <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded" data-index="${index}">Delete</button>
                </div>
            `;
            entriesSection.appendChild(entryDiv);
        });

    document.querySelectorAll(".edit-btn").forEach(btn =>
        btn.addEventListener("click", e => {
            editIndex = e.target.dataset.index;
            const entry = entries[editIndex];
            descriptionInput.value = entry.description;
            amountInput.value = entry.amount;
            typeInput.value = entry.type.charAt(0).toUpperCase() + entry.type.slice(1);
        })
    );

    document.querySelectorAll(".delete-btn").forEach(btn =>
        btn.addEventListener("click", e => {
            const index = e.target.dataset.index;
            const entry = entries[index];
            if (entry.type === "income") {
                totalIncome -= entry.amount;
            } else {
                totalExpense -= entry.amount;
            }
            entries.splice(index, 1);
            updateDisplay();
            renderEntries();
        })
    );
}

addButton.addEventListener("click", () => {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value.trim().toLowerCase();

    if (!description || isNaN(amount) || amount <= 0 || (type !== "income" && type !== "expense")) {
        alert("Please enter valid data in all fields.");
        return;
    }

    if (editIndex !== null) {
        const oldEntry = entries[editIndex];
        if (oldEntry.type === "income") {
            totalIncome -= oldEntry.amount;
        } else {
            totalExpense -= oldEntry.amount;
        }

        entries[editIndex] = { description, amount, type };
        editIndex = null;
    } else {
        entries.push({ description, amount, type });
    }

    if (type === "income") {
        totalIncome += amount;
    } else {
        totalExpense += amount;
    }

    updateDisplay();
    renderEntries();

    // Clear inputs
    descriptionInput.value = "";
    amountInput.value = "";
    typeInput.value = "";
});

resetButton.addEventListener("click", () => {
    totalIncome = 0;
    totalExpense = 0;
    entries = [];
    updateDisplay();
    renderEntries();
});

radioButtons.forEach(rb =>
    rb.addEventListener("change", () => {
        renderEntries();
    })
);

// Initial render
updateDisplay();
renderEntries();

