const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	//  функция для скрытия 3 элементов со старницы
	hideAllResponseBlocks = () => {
		//  получаем все элементы со станицы с классом dialog__response-block и через методм Array.from все записываем в массив
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// через forEach все элементы массива responseBlocksArray скрываем display-none
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	// функция showResponseBlock показывает элементы на страницы в зависемотси от результата принимате 3 аргумента
	// 1аргумент--- класс со страницы, 2аргумент--- 
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// вызов функциии hideAllResponseBlocks для скрытия элементов со станицы
		hideAllResponseBlocks();
		// для 1 переданного аргумента (класса со страницы) показываем display block
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	//  функция showError вызывает функцию showResponseBlock которая принимает 3 аргумент 
	//	(1 аргумент равен классу со страницы)
	//	(2 аргумент равен тексту со страницы)
	//	(3 аргумент равен классу со страницы)
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	//  функция showResults вызывает функцию showResponseBlock которая принимает 3 аргумент 
	//	(1 аргумент равен классу со страницы)
	//	(2 аргумент равен тексту со страницы)
	//	(3 аргумент равен классу со страницы)
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	//  функция showNoResults вызывает функцию showResponseBlock которая принимает 1 аргумент 
	// (1 аргумент равен классу со страницы)
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	// функция tryFilterByType принимает 2аргумента
	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};
//  получаем элемент со страницы кнопку фильтровать
const filterButton = document.querySelector('#filter-btn');
//  навешиваес слушаетль click на кнопку filterButton 
filterButton.addEventListener('click', e => {
	//  получаем элемент со страницы select 
	const typeInput = document.querySelector('#type');
	// получаем элемент со страницы инпут для ввода данных
	const dataInput = document.querySelector('#data');
	// условие dataInput значение строго равно пустой строке то
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// вызываем функцию showNoResults которая отображает дефолтное значение
		showNoResults();
		// если dataInput значение не пустое 
	} else {
		dataInput.setCustomValidity('');
		// убираем стандартную перезагрузку браузера
		e.preventDefault();
		// вызываем функцию tryFilterByType (1аргумент--- равен значению select typeInput;  2аргумент---равен значению инпута dataInput)
		// через метод трим убираем пробелы со всех сторон у всех элементов
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

