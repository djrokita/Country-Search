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
		$countryList.empty();
		resp.forEach(function(item) {
			var info = item.name + ', ' + item.capital;
			$('<li>').text(info).appendTo($countryList);
		});
	}
})
