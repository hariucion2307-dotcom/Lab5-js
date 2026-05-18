import { generateId } from "./utils.js";
import { addToTransactions, removeTransaction, transactions } from "./transactions.js";
import { renderTable, updateTotal, showDetails } from "./ui.js";
const form = document.getElementById("transaction-form");
const tableBody = document.querySelector("tbody");
const totalEl = document.getElementById("total");
const detailsEl = document.getElementById("details");
/**
 * Добавление транзакции
 */ 
function addTransaction(amount, category, description) { 
    const transaction = {
        id: generateId(),
        date: new Date(),
        amount: Number(amount),
        category,
        description
    };
    addToTransactions(transaction);
    updateUI();
} 
/**
 * Обновление интерфейса 
 */ 
function updateUI() {
    renderTable(transactions, tableBody, handleDelete, handleSelect); 
    updateTotal(totalEl, transactions);
} 
/**
 * Удаление транзакции
 */ 
function handleDelete(id) {
    removeTransaction(id);
    updateUI();
} 
/**
 * Выбор транзакции 
 */ 
function handleSelect(transaction) {
    showDetails(detailsEl, transaction);
} 
/**
 * Submit формы 
 */ 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    if (!amount || !category || !description) {
        alert("Заполните все поля!");
        return;
    } 
    addTransaction(amount, category, description);
    form.reset();
})