// declared variables
var cityInput = document.querySelector(".city-input");
var searchButton = document.querySelector(".search-btn");
var currentWeatherEl = document.querySelector(".current-weather");
var fiveCardsEl = document.querySelector("fiveCards");
var temperatureEl = document.querySelector("temperature");
var windEl = document.querySelector("wind");
var humidityEl = document.querySelector("humidity");
var weatherCardsEl = document.querySelector(".weather-cards");
var cityNameEl = document.querySelector("cityName");

var currentDate = dayjs();
var searchedCitiesList = [];

var myKEY = "1daa4de7f71b97407ea5f1450763757e"




  // Function to search for a city
  var findCity = function () {
    var city = cityInput.value;
    getWeather(city);
  };


var getWeather = function (city) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=`+query+`&appid=1daa4de7f71b97407ea5f1450763757e`";
    fetch(queryUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (currentInfo) {
        console.log(currentInfo);
        var queryWeather = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={myKey}&units=imperial";
        fetch(queryWeather)
          .then(function (response) {
            return response.json();
          })
          .then(function (fiveCardsInfo) {
            console.log(fiveCardsInfo);

            searchedCitiesList.push(currentInfo.name);
            localStorage.setItem("searchedCitiesList", JSON.stringify(searchedCitiesList));
            displayCities();
            
            cityNameEl.innerHTML = currentInfo.name + "currentDate" +
              "https://openweathermap.org/img/wn/+fiveCardsInfo.daily[i].weather[0].icon+.png";

            temperatureEl.innerHTML = "Temperature: " + fiveCardsInfo.current.temperature + "°F";
            windEl.innerHTML = "Wind: " + fiveCardsInfo.current.wind;
            humidityEl.innerHTML = "Humidity: " + fiveCardsInfo.current.humidity;
  
            // enter info for 5 days cards
            fiveCardsEl.innerHTML = "";
            for (let i = 1; i < 6; i++) {
                var card = {
                    "temperature":fiveCardsInfo.daily[i].temp + "°F",
                    "humidity": fiveCardsInfo.daily[i].humidity+ "%",
                    "wind":fiveCardsInfo.daily[i].wind_speed+ "MPH",
                    "icon":"https://openweathermap.org/img/wn/"+fiveCardsInfo.daily[i].weather[0].icon+".png"
                }
              console.log(fiveCardsInfo.daily[i].weather[0].icon);

             fiveCardsEl.innerHTML = card
          };
      })
    });
  
  // Function to make a list for previously searched city
    var displayCities = function () {
    var searchedCities = JSON.parse(localStorage.getItem("searchedCitiesList"));
    if (searchedCities) {
      searchedCities = searchedCitiesList;
      for (i = 0; i < searchedCitiesList.length; i++) {
        var searchedList = document.getElementById("searchedCitiesList");
        searchedList.innerHTML = "<li>" +searchedCities+ "</li>"; 
          
      }
    }
  };
  displayCities();
};
  
  
  
  // event listener for the search button click
  searchButton.addEventListener("click", findCity);
            


