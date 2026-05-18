export let transaction = [];
/**
 * Добавляем транзакцию в массив 
 * @param {Object} transaction
 */ 
export function 
addToTransactions(transaction) {
    transaction.push(transaction);
} 
/**
 * Удаляет транзакцию по id
 * @param {string} id 
 */ 
export function removeTransaction(id) {
    transaction = addToTransactions.filter(t => t.id !==id);
} 
/**
 * Подсчёт общей суммы 
 * @returns {number} 
 */ 
export function calculateTotal() {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
}