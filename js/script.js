// создаем функцию filterByType, в нее передаем нужный тип данных и массив значений, значения фильтруются по указанном типу
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
		// задаем условие, если существует spanSelector, то
		if (spanSelector) {
			// получаем элемент с селектором spanSelector и присваеваем ему текстовое значение msgText
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	//  функция showError вызывает функцию showResponseBlock которая принимает 3 аргумент 
	//	(1 аргумент равен классу со страницы див с блоком ошибкой)
	//	(2 аргумент равен тексту со страницы текст с ошибкой)
	//	(3 аргумент равен классу со страницы span со шибкой)
	// создаем функцию showError, в которую принимаем аргумент msgText, вызываем функцию showResponseBlock для ошибки
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	//  функция showResults вызывает функцию showResponseBlock которая принимает 3 аргумент 
	//	(1 аргумент равен классу со страницы див с блоком что все получилось)
	//	(2 аргумент равен тексту со страницы текст с полученной информацие)
	//	(3 аргумент равен классу со страницы span с полученным результатом)
	// создаем функцию showResults, в которую принимаем аргумент msgText, вызываем функцию showResponseBlock для результата
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//  функция showNoResults вызывает функцию showResponseBlock которая принимает 1 аргумент 
	// (1 аргумент равен классу со страницы)
	// функция вызывается для отсутсвие результата
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// функция tryFilterByType принимает 2аргумента
	// 1аргумент---равен значению select typeInput
	// 2аргумент---равен значению инпута dataInput
	tryFilterByType = (type, values) => {
		 // создаем конструкцию try {} catch
		try {
			// создаем valuesArray, выполняем filterByType, конкатенируем значения массива values в строку с разделитилем ", "
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// создаем переменную alertMsg, в которую записываем результат выполнения тернарного оператора, с условием существования строки valuesArray
			const alertMsg = (valuesArray.length) ?
				// если  существует, то записываем сообщение с результатами
				`Данные с типом ${type}: ${valuesArray}` : 
				// если не существует, то записываем сообщение об отсутствии результатов
				`Отсутствуют данные типа ${type}`; 
				// вызваем showResults, передаем аргумент alertMsg
			showResults(alertMsg);
			// ловим ошибку, если она есть, то
		} catch (e) {
			 // вызываем showError с информацией об ошибке
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
		// задаем сообщение если пользователь оставил поле пустым
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// вызываем функцию showNoResults которая отображает дефолтное значение
		showNoResults();
		// если dataInput значение не пустое 
	} else {
		//если пользователь ввел данные убираем сообщение валидации
		dataInput.setCustomValidity('');
		// убираем стандартную перезагрузку браузера
		e.preventDefault();
		// вызываем функцию tryFilterByType (1аргумент--- равен значению select typeInput;  2аргумент---равен значению инпута dataInput)
		// через метод трим убираем пробелы со всех сторон у всех элементов
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

