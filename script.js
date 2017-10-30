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
	//		boxInfo.data;
		});
	}

	function Info(input) {
		var self = this;
		this.name = input.name;
		this.flag = input.flag;
		this.capital = input.capital;
		this.area = input.area;
		this.population = input.population;
		this.lang = getAllNames(input);
		this.currency = getAllNames(input);
		this.$element = createInfo();
		//this.data = fillData();

		function createInfo() {
	
			var $box = $('<div>').attr('class', 'box');
			var $boxNav = $('<div>').attr('class', 'boxNav');
			//$flag = $('<img>').attr('class', 'flag');
			var $flagBox = $('<div>').attr('class', 'flagBox');
			var $nameBox = $('<div>').attr('class', 'nameBox');

			var $boxName = $('<h1>').attr('class', 'country-header').text(self.name);
			var $headerInner = $('<h2>').text('Background Information');
			var $inner = $('<div>').attr('class', 'inner');
			var $features = $('<ul>').attr('class', 'features');

			//$flag.appendTo($flagBox);
			$flagBox.appendTo($boxNav);
			$boxName.appendTo($nameBox);
			$nameBox.appendTo($boxNav);
			
			$inner.append($headerInner);
			$inner.append($features);
			
			$boxNav.appendTo($box);
			
			$box.append($inner);
			$box.appendTo('.container');

			//createInformationList();
			fillData($flagBox, $features);
		}	

/*		function createInformationList() {
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
*/
		function fillData(flag, features) {
			var formatArea = formatNumbers(self.area);
			var formatPopulation = formatNumbers(self.population);
			
			var $flag = $('<img>').attr('src', self.flag);
			var $capital = $('<li>').text('Capital: ' + self.capital);
			var $area = $('<li>').text('Land area: ' + formatArea + ' km').append($('<sup>').text('2'));
			var $population = $('<li>').text('Population: ' + formatPopulation); 
			var $languages = $('<li>').text('Language(s): ' + self.lang);
			var $currency = $('<li>').text('Currency: ' + self.currency);
			
			$flag.appendTo(flag);
			$capital.appendTo(features);
			$area.appendTo(features);
			$population.appendTo(features);
			$languages.appendTo(features);
			$currency.appendTo(features);
		}
}	
		function getAllNames(num) {
			var allNames = "";	
			num.languages.forEach(function(item) {
				allNames += item.name + ", ";
			})
			if (allNames.slice(-2) == ", ") allNames = allNames.slice(0, -2);
			return allNames;
		}

		function getCurrencyName(num) {
			var currencies = "";	
			num.currencies.forEach(function(item) {
				currencies += item.name + ", ";
			})
			if (currencies.slice(-2) == ", ") currencies = currencies.slice(0, -2);
			return currencies;
		}


	function clearContainer () {
		$('.container').empty();
	}

	function formatNumbers(num) {
		var liczba = num + '';
		if (liczba.length < 7) {
			liczba = liczba.slice(0,-3) + ' ' + liczba.slice(-3);
			return liczba
		}
		else if (liczba.length < 10) {
			liczba = liczba.slice(0,-3) + ' ' + liczba.slice(-3);
			liczba = liczba.slice(0,-7) + ' ' + liczba.slice(-7);
		}	
		else if (liczba.length < 13) {
			liczba = liczba.slice(0,-3) + ' ' + liczba.slice(-3);
			liczba = liczba.slice(0,-7) + ' ' + liczba.slice(-7);
			liczba = liczba.slice(0,-11) + ' ' + liczba.slice(-11);
		}	
		else if (liczba.length < 16) {
			liczba = liczba.slice(0,-3) + ' ' + liczba.slice(-3);
			liczba = liczba.slice(0,-7) + ' ' + liczba.slice(-7);
			liczba = liczba.slice(0,-11) + ' ' + liczba.slice(-11);
			liczba = liczba.slice(0,-15) + ' ' + liczba.slice(-15);	
		}
		return liczba
	}
});
