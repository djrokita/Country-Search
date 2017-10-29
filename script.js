$(document).ready(function () {

	var url = 'https://restcountries.eu/rest/v2/name/';
	var $countryList = $('#countries');
	var $btn = $('#search');
	var $input = $('#country-name');

	$btn.click(searchCountries);

	function searchCountries() {
		var $countryName = $input.val();
	
		if(!$countryName.length) $countryName = 'Poland';

		$.ajax({
			url: url + $countryName,
			method: 'get',
			success: showCountriesList
		});
	}

	function showCountriesList(resp) {
		clearContainer();
		resp.forEach(function(item) {
			var boxInfo = new Info(item);
			boxInfo.$element;
			boxInfo.data;
		});
	}

	function Info(input) {
		var self = this;
		this.name = input.name;
		this.flag = input.flag;
		this.capital = input.capital;
		this.area = input.area;
		this.population = input.population;
		this.lang = getLangName();
		this.currency = getCurrencyName();
		this.$element = createInfo();
		this.data = fillData();

		function createInfo() {
	
			$box = $('<div>').attr('class', 'box');
			$boxNav = $('<div>').attr('class', 'boxNav');
			$flag = $('<img>').attr('class', 'flag');
			$flagBox = $('<div>').attr('class', 'flagBox');
			$nameBox = $('<div>').attr('class', 'nameBox');

			$boxName = $('<h1>').attr('class', 'country-header').text(self.name);
			$headerInner = $('<h2>').text('Background Information');
			$inner = $('<div>').attr('class', 'inner');
			$features = $('<ul>').attr('class', 'features');

			$flag.appendTo($flagBox);
			$flagBox.appendTo($boxNav);
			$boxName.appendTo($nameBox);
			$nameBox.appendTo($boxNav);
			
			$inner.append($headerInner);
			$inner.append($features);
			
			$boxNav.appendTo($box);
			
			$box.append($inner);
			$box.appendTo('.container');

			createInformationList();
		}

		function createInformationList() {
			$capital = $('<li>').attr('class', 'capital');
			$area = $('<li>').attr('class', 'area');
			$population = $('<li>').attr('class', 'population'); 
			$languages = $('<li>').attr('class', 'lang');
			$currency = $('<li>').attr('class', 'currency').text('Currency: ');
			
			$capital.appendTo($features);
			$area.appendTo($features);
			$population.appendTo($features);
			$languages.appendTo($features);
			$currency.appendTo($features);
		}

		function getLangName() {
			var langName = "";	
			input.languages.forEach(function(item) {
				langName += item.name + ", ";
			})
			if (langName.slice(-2) == ", ") langName = langName.slice(0, -2);
			return langName;
		}

		function getCurrencyName() {
			var currencies = "";	
			input.currencies.forEach(function(item) {
				currencies += item.name + ", ";
			})
			if (currencies.slice(-2) == ", ") currencies = currencies.slice(0, -2);
			console.log(currencies);
			return currencies;
		}

		function fillData() {
			var formatArea = formatNumbers(self.area);
			var formatPopulation = formatNumbers(self.population);
			$flag.attr('src', self.flag);
			console.log($flag);
			$capital.text('Capital: ' + self.capital);
			$area.text('Land area: ' + formatArea + ' km').append($('<sup>').text('2'));
			$population.text('Population: ' + formatPopulation);
			$languages.text('Language(s): ' + self.lang);
			$currency.text('Currency: ' + self.currency);
		}
	
	}

	function clearContainer () {
		$('.container').empty();
	}

	function formatNumbers(num) {
		var liczba = num + '';
		if (liczba.length < 7) {
			liczba = liczba.slice(0,-3) + ' ' + liczba.slice(-3);
			console.log(liczba);
			return liczba
		}
		else if (liczba.length < 10) {
			liczba = liczba.slice(0,-3) + ' ' + liczba.slice(-3);
			liczba = liczba.slice(0,-7) + ' ' + liczba.slice(-7);
			console.log(liczba);
		}	
		else if (liczba.length < 13) {
			liczba = liczba.slice(0,-3) + ' ' + liczba.slice(-3);
			liczba = liczba.slice(0,-7) + ' ' + liczba.slice(-7);
			liczba = liczba.slice(0,-11) + ' ' + liczba.slice(-11);
			console.log(liczba);
		}	
		else if (liczba.length < 16) {
			liczba = liczba.slice(0,-3) + ' ' + liczba.slice(-3);
			liczba = liczba.slice(0,-7) + ' ' + liczba.slice(-7);
			liczba = liczba.slice(0,-11) + ' ' + liczba.slice(-11);
			liczba = liczba.slice(0,-15) + ' ' + liczba.slice(-15);	
			console.log(liczba);
		}
		return liczba
	}
});
