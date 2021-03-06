$(document).ready(function() {

  function Info(input) {
    var self = this;
    this.name = input.name;
    this.flag = input.flag;
    this.capital = input.capital;
    this.area = input.area;
    this.population = input.population;
    this.lang = getAllNames(input.languages);
    this.currency = getAllNames(input.currencies);
    this.$element = createInfo();

    function createInfo() {

      var $box = $('<div>').attr('class', 'box');
      var $boxNav = $('<div>').attr('class', 'boxNav');
      var $flagBox = $('<div>').attr('class', 'flagBox');
      var $nameBox = $('<div>').attr('class', 'nameBox');

      var $boxName = $('<h1>').attr('class', 'country-header').text(self.name);
      var $headerInner = $('<h2>').text('Background Information');
      var $inner = $('<div>').attr('class', 'inner');
      var $features = $('<ul>').attr('class', 'features');

      $flagBox.appendTo($boxNav);
      $boxName.appendTo($nameBox);
      $nameBox.appendTo($boxNav);

      $inner.append($headerInner);
      $inner.append($features);

      $boxNav.appendTo($box);

      $box.append($inner);
      $box.appendTo('.container');

      fillData($flagBox, $features, $box);
    }

    function fillData(flag, features, box) {
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

      box.hide();
      box.fadeIn('slow');
    }
  }

  var url = 'https://restcountries.eu/rest/v2/name/';
  var $countryList = $('#countries');
  var $btn = $('#search');
  var $input = $('#country-name');

  $btn.click(searchCountries);

  function searchCountries() {
    var $countryName = $input.val();

    if (!$countryName.length) $countryName = 'Poland';

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
      console.log(boxInfo.lang);
    });
  }

  //Stara funkcja getAllNames, zostaje tu przez sentyment :)
  /*
    function getAllNames(num) {
      var allNames = "";
      num.languages.forEach(function(item) {
        allNames += item.name + ", ";
      })
      if (allNames.slice(-2) == ", ") allNames = allNames.slice(0, -2);
      return allNames;
    }

//Pierwsze użycie .map i .join  
  function getAllNames(num) {
    var allNamesArray = [];
    num.map(function(item) {
      allNamesArray.push(item.name);
    });
    var allNames = allNamesArray.join(', ');
    return allNames;
  }
*/
  function getAllNames(num) {
    var allNames = '';

    function getString(element) {
      allNames = element.join(', ');
    }

    getString(num.map(function(item) {
      return item.name;
    }));

    return allNames;
  }

  function clearContainer() {
    $('.container').empty();
  }

  function formatNumbers(num) {
    var stringNumber = '' + num;
    var tempNumber = '';
    var counter = 0;
    for (var i = stringNumber.length - 1; i >= 0; i--) {
      tempNumber += stringNumber[i];
      if (tempNumber.length % 3 == counter) {
        tempNumber += ' ';
        if (counter < 2) counter++;
        else counter = 0;
      }
    }
    stringNumber = '';
    for (var i = tempNumber.length - 1; i >= 0; i--) {
      stringNumber += tempNumber[i];
    }
    return stringNumber;
  }

  //Stara funkcja formatNumbers - zostawiam zakomentowaną na pamiątkę :)
  /*  
    function formatNumbers(num) {
      var stringNumber = '' + num;
      if (stringNumber.length < 7) {
        stringNumber = stringNumber.slice(0, -3) + ' ' + stringNumber.slice(-3);
      } else if (stringNumber.length < 10) {
        stringNumber = stringNumber.slice(0, -3) + ' ' + stringNumber.slice(-3);
        stringNumber = stringNumber.slice(0, -7) + ' ' + stringNumber.slice(-7);
      } else if (stringNumber.length < 13) {
        stringNumber = stringNumber.slice(0, -3) + ' ' + stringNumber.slice(-3);
        stringNumber = stringNumber.slice(0, -7) + ' ' + stringNumber.slice(-7);
        stringNumber = stringNumber.slice(0, -11) + ' ' + stringNumber.slice(-11);
      } else if (stringNumber.length < 16) {
        stringNumber = stringNumber.slice(0, -3) + ' ' + stringNumber.slice(-3);
        stringNumber = stringNumber.slice(0, -7) + ' ' + stringNumber.slice(-7);
        stringNumber = stringNumber.slice(0, -11) + ' ' + stringNumber.slice(-11);
        stringNumber = stringNumber.slice(0, -15) + ' ' + stringNumber.slice(-15);
      }
      return stringNumber
    }
  */

});