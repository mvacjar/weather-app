function getDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = date.getDay();
  let dayList = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  return `${dayList[days]}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(`#forecast`);

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="column weather-forecast" id="forecast">
        <div class="card" style="width: 10rem" id="card">
          <span id="forecast-day">${formatDay(forecastDay.dt)}</span>
          <img
            width="50"
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            class="card-img"
            id="forecast-img"
          />
          <div class="card-body">
            <div id="forecast-temperature">
              <span id="celsius-max">${Math.round(
                forecastDay.temp.max
              )}</span><span class="º">º</span>
              <span id="celsius-min">${Math.round(
                forecastDay.temp.min
              )}</span><span class="ºº">º</span>
            </div>
          </div>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  document.querySelector("#city-default").innerHTML = response.data.name;
  document.querySelector("#grades").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#cloud").innerHTML = response.data.clouds.all;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#main-icon")
    .setAttribute(
      `src`,
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector(`#main-icon`)
    .setAttribute(`alt`, response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "bc92040c41ead89e1ebda9b28b14ef5b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showCurrentCity(position) {
  let apiKey = "bc92040c41ead89e1ebda9b28b14ef5b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentCity);
}

function searchPlace(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-input`).value;
  searchCity(city);
}

function showFahrenheit(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector(`#grades`);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  mainTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let mainTemperature = document.querySelector(`#grades`);
  mainTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let currentButton = document.querySelector(`#current-button`);
currentButton.addEventListener(`click`, currentLocation);

let search = document.querySelector(`#search-place`);
search.addEventListener(`submit`, searchPlace);

let changeDate = document.querySelector("#main-date");
let current = new Date();
changeDate.innerHTML = getDate(current);

let fahrenheit = document.querySelector(`#fahrenheit`);
fahrenheit.addEventListener(`click`, showFahrenheit);

let celsius = document.querySelector(`#celsius`);
celsius.addEventListener(`click`, showCelsius);

searchCity("Stockholm");
displayForecast();
