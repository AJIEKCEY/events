# Тестовое задание №4

Репозиторий содержит 3 файла:
* index.html - html и js код
* events.json - данные
* angular.min.js - AngularJS v1.4.8 

Исходные данные:
* Файл events.json содержит структуру для хранения событий
* Событие содержит набор полей (данные сгенерированы случайно)
* Значение полей и кодов для type, state и series можно понять из файла index.html
* Некоторые поля могут отсутствовать (series, place, desc, price, link)
* index.html при помощи angular заполняет таблицу событий как есть, без сортировки, без фильтрации

Что нужно сделать:
* По умолчанию пользователю должны показываться только будущие события
* Для просмотра прошедших событий в текущем и прошлых годах на странице должны быть ссылки вида "2016", "2017", "2018" и т.п. - меню Навигации
* Для возврата к будущим событиям - ссылка "События" - меню Навигации
* Меню Навигации располагается над таблицей, ссылки фильтруют таблицу по годам и меняют URL в браузере так, чтобы можно было по ссылке сразу попасть на нужный год или будущие события (пустой контекст /)
* Список в меню Навигации всегда начинается с 2016 года, заканчивается текущим, т.е. в нашем случае это может быть либо 2018, либо 2019
* События должны быть отсортированы по дате и времени по возрастанию, т.е. самое ближайшее событие идет первым
* Сортировка по другим полям не предусмотрена
* В исходном варианте при загрузке страницы пользователь сначала видит таблицу с "мусором" типа "{{ ... }}", после загрузки angular - пустую таблицу, после выполнения запроса - таблицу с данными. Нужно, чтобы пользователь с самого начала видел текст или картинку "Идет загрузка", после выполнения запроса - таблицу с данными
* Пользователю доступны фильтрации по полям date - дата от-до, title - по тексту, type - выпадающий список  с множественным выбором (ВСсМН), state - ВСсМН, series - ВСсМН, place - по тексту, desc - по тексту
* Фильтрация по тексту регистронезависимая, введенная строка может находиться в любом месте исходного текста
* В ВСсМН пользователь должен видеть русские значения для кодов
* Выбранные фильтры должны менять URL браузера так, чтобы можно было по ссылке сразу получать установленные фильтры и отфильтрованные события

Как нужно делать:
* Технологии - любые доступные, но плюсом будет применение технологий, указанных в вакансии
* Верстка - с применением table, на div-ах или любые другие способы
* Дизайн - никаких ограничений

Время на реализацию - не более суток
Вопросы по заданию, по реализации и любые другие приветствуются
После commit в репозиторий результат будет виден по адресу: https://datasoft-interviews.github.com/sergey-moldova