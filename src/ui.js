import { shortDescription, formatDate } from "./utils.js";  
import { calculateTotal } from "./transactions.js";
/**
 * Отрисовка таблицы 
 */ 
export function renderTable(transactions, tableBody, onDelete, onSelect) {
    tableBody.innerHtml = "";
    transactions.forEach(t => {const row = document.createElement("tr");
        row.className = t.amount >=0 ? "green" : "red";
        row.innerHTML = `
      <td>${formatDate(t.date)}</td>
      <td>${t.category}</td>
      <td>${shortDescription(t.description)}</td>
      <td><button data-id="${t.id}">Удалить</button></td>
    `; 
    //клик по строке 
    row.addEventListener("click", (e) => { if (e.target.tagName !== "BUTTON") {
        onSelect(t);
    }
}); 
tableBody.appendChild(row);
    });
    //обработка удаления (делегирование) 
    tableBody.onclick = (e) => {
        if (e.target.tagName === "BUTTON") {
            onDelete(e.target.dataset.id);
        } 
    };
}
/**
 * Обновление общей суммы 
 */ 
export function updateTotal(totalElement, transactions)  {
    totalElement.textContent = calculateTotal(transactions);
} 
/** 
 * Показ деталей 
 */ 
export function showDetails(detailEl, transaction) {
    detailsEl.textContent = `Полное описание: ${transaction.description}`;
} 
