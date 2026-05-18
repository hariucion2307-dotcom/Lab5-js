/**
 * Генерирует уникальный ID
 * @returns {string} 
 */ 
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
} 
/**
 * Форматирует дату
 * @param {Date} date 
 * @param {string}
 */  
export function formatDate(date) {
    return date.toLocaleString();
}
/**
 * Берёт первые 4 слова описания 
 * @param {string} text 
 * @returns {string} 
 */ 
export function shortDescription(text) {
    return text.split(" ").slice(0, 4).join(" ");
}  