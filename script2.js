$(document).ready(function () {

	var url = 'https://restcountries.eu/rest/v2/name/';
	var $countryList = $('#countries');
	var $btn = $('#search');
	var $input = $('#country-name');

	$btn.click(searchCountries);

	var countryPopulation = 0;

	function searchCountries() {
		var $countryName = $input.val();
		
		if(!$countryName.length) $countryName = 'Poland';

		$.ajax({
			url: url + $countryName,
			method: 'get',
			success: showCountriesList
		});

	}

	var list = [];
/*
	function showCountriesList(resp) {
		$countryList.empty();
		list = resp;
		resp.forEach(function(item) {
			var info = item.name + ', ' + item.capital;
			/*var lang = item.languages.forEach(function(n) {
				lang += n.name + ', '; 
			})
			$('<li>').text(info).appendTo($countryList);
			console.log(item.languages[0].name);	 
		});
	}
*/
	function showCountriesList(resp) {
		console.log(resp);
		clearContainer();
		list = resp;
		resp.forEach(function(item) {
			//var name = item.name;
			var boxInfo = new Info(item);
			boxInfo.$element;
			boxInfo.data;
		});
	}

	function Info(input) {
		var self = this;
		this.object = input;
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
			//$headCountry = $('<li>').attr('class', 'headCountry').text('Head of State: ');
			$capital = $('<li>').attr('class', 'capital');
			$area = $('<li>').attr('class', 'area');
			$population = $('<li>').attr('class', 'population'); 
			$languages = $('<li>').attr('class', 'lang');
			$currency = $('<li>').attr('class', 'currency').text('Currency: ');
			

			//$headCountry.appendTo($features);
			$capital.appendTo($features);
			$area.appendTo($features);
			$population.appendTo($features);
			$languages.appendTo($features);
			$currency.appendTo($features);
		}

		function getLangName() {
			var kurwa = "";	
			input.languages.forEach(function(item) {
				kurwa += item.name + ", ";
			})
			console.log(kurwa);
			return kurwa;
		}

		function getCurrencyName() {
			var kurwa = "";	
			input.currencies.forEach(function(item) {
				kurwa += item.name + ", ";
			})
			console.log(kurwa);
			return kurwa;
		}

		function fillData() {
			$flag.attr('src', self.flag);
			console.log($flag);
			$capital.text('Capital: ' + self.capital);
			$area.text('Land area: ' + self.area);
			$population.text('Population: ' + self.population);
			$languages.text('Language(s): ' + self.lang);
			$currency.text('Currency: ' + self.currency);
		}
	
	}

	function clearContainer () {
		$('.container').empty();
	}


	//var test = new Info('Poland');
	//console.log(test.name);
	//console.log(test.lang);
});
