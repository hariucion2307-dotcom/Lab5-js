                               Министерство просвещения и исследований Республики Молдова  
                                          Государственный   Университет Молдовы 
                                           Факультет   Математики и Информатики 
                                              Департамент “Информатики” 




                                                                  

                                              Лабораторная работа №5
                                              По предмету: JavaScript.
                               Тема: Работа с DOM-деревом и событиями в JavaScript.


                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                   
                                                                                                               






                                                                                                                   
                                                                                                                   Выполнил: Харюк Ион 
                                                                                                                     Группа: I2502
                                                                                                                    Проверил: Calin N.
                                                           Кишинёв 2026

Цель работы
Цель данной лабораторной работы заключается в изучении принципов взаимодействия JavaScript с DOM-деревом (Document Object Model), освоении работы с событиями, а также создании веб-приложения для учета личных финансов.
В процессе работы необходимо:
•	научиться работать с DOM-элементами; 
•	использовать события (click, submit); 
•	реализовать модульную структуру JavaScript; 
•	научиться добавлять, удалять и отображать данные на странице; 
•	реализовать простую логику финансового учета.
Описание файлов
1. index.html
Основной HTML файл, содержащий:
•	форму для добавления транзакции 
•	таблицу для отображения транзакций 
•	блок для отображения общей суммы 
•	блок для подробного описания транзакции 
2. style.css
Файл стилей отвечает за:
•	оформление таблицы 
•	цветовое выделение строк (зелёный — доход, красный — расход) 
•	оформление формы 
3. index.js
Главный файл проекта:
•	связывает все модули 
•	обрабатывает события формы 
•	управляет добавлением и удалением транзакций 
•	пересчитывает общую сумму 
4. transactions.js
Модуль работы с данными:
•	хранит массив транзакций 
•	добавляет транзакции 
•	удаляет транзакции 
5. ui.js
Модуль интерфейса:
•	отрисовка таблицы 
•	создание строк таблицы 
•	обновление DOM 
•	обработка отображения деталей 
6. utils.js
Вспомогательные функции:
•	генерация уникального ID 
•	сокращение описания до 4 слов 
•	форматирование данных 
Логика работы приложения
Работа приложения происходит по следующему алгоритму:
1.	Пользователь заполняет форму (сумма, категория, описание) 
2.	Нажимает кнопку “Добавить” 
3.	Создается объект транзакции 
4.	Транзакция добавляется в массив 
5.	Таблица обновляется 
6.	Пересчитывается общая сумма 
7.	При клике на строку показывается подробная информация 
8.	При нажатии кнопки удаления запись удаляется 
Добавление транзакции
Функция addTransaction() выполняет:
•	создание объекта транзакции 
•	добавление его в массив 
•	обновление таблицы 
Если сумма:
•	положительная строка окрашивается в зелёный 
•	отрицательная   строка окрашивается в красный 
Удаление транзакции
Удаление реализовано через делегирование событий:
•	обработчик навешан на <table> 
•	при клике определяется кнопка удаления 
•	по ID удаляется элемент из массива 
•	таблица перерисовывается 
Подсчет общей суммы
Функция calculateTotal():
•	проходит по массиву транзакций 
•	суммирует значения amount 
•	выводит результат в HTML 
Отображение подробной информации
При клике на строку таблицы:
•	в блок <div id="details"> выводится полное описание транзакции 
•	отображается вся информация (категория, описание, сумма) 
Форма добавления
Форма содержит:
•	поле суммы 
•	поле описания 
•	select категории 
•	кнопку добавления
Структура проекта
Интерфейс приложения
Файл index.js
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
Файл transactions.js
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
Файл ui.js
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
Файл utils.js
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
6.Добавление транзакций
Функция addTransaction() выполняет следующие действия:
1.	Получает данные из формы;
2.	Создает объект транзакции;
3.	Добавляет объект в массив transactions;
4.	Отрисовывает новую строку в таблице;
5.	Обновляет общую сумму.
Логика окрашивания строк:
•	Если сумма положительная   строка окрашивается в зелёный цвет;
•	Если отрицательная   строка окрашивается в красный цвет.
Краткое описание:
Отображаются только первые 4 слова описания.
7. Управление транзакциями
Каждая строка таблицы содержит кнопку удаления.
При нажатии:
•	определяется id транзакции;
•	удаляется элемент из массива transactions;
•	удаляется строка из DOM.
Обработчик события назначается на <table> (делегирование событий), что позволяет эффективно обрабатывать клики.
8. Подсчет общей суммы
Функция calculateTotal():
•	проходит по всем транзакциям;
•	суммирует значения amount;
•	отображает результат на странице.
Функция вызывается автоматически после добавления или удаления транзакции.
9. Отображение подробной информации
При клике на строку таблицы отображается полное описание транзакции в отдельном блоке <div>.
Это реализовано через обработчик событий на таблице с использованием делегирования.
10. Форма добавления транзакции
На странице реализована форма с полями:
•	сумма;
•	категория (<select>);
•	описание;
•	кнопка добавления.
Валидация формы:
•	проверка пустых полей;
•	проверка корректности суммы;
•	блокировка отправки при ошибках.   
Контрольные вопросы и ответы
1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?
Доступ к элементам DOM осуществляется с помощью методов:
•	document.getElementById()
•	document.querySelector()
•	document.querySelectorAll()
2. Что такое делегирование событий?
Делегирование событий — это подход, при котором обработчик события назначается родительскому элементу вместо каждого дочернего элемента.
Это позволяет:
•	уменьшить количество обработчиков;
•	повысить производительность;
•	работать с динамически добавляемыми элементами.
Пример:
table.addEventListener("click", (event) => {
if (event.target.classList.contains("delete")) {
}
});
3. Как изменить содержимое элемента DOM?
Содержимое элемента можно изменить с помощью:
•	innerHTML
•	textContent
Пример:
document.getElementById("total").textContent = "1000 MDL";
4. Как добавить новый элемент в DOM?
Для добавления элементов используются:
•	createElement()
•	appendChild()
•	append()
Пример:
const row = document.createElement("tr");
table.appendChild(row);
                                                         Вывод
В ходе выполнения лабораторной работы были изучены основные принципы работы с DOM-деревом, обработка событий и модульная структура JavaScript-приложения.
Также были получены практические навыки создания интерактивного веб-приложения с динамическим обновлением интерфейса.


