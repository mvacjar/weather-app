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

function displayWeather(response) {
  console.log(response);
  document.querySelector("#city-default").innerHTML = response.data.city;
  document.querySelector("#grades").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#pressure").innerHTML =
    response.data.temperature.pressure;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#main-icon")
    .setAttribute(
      `src`,
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector(`#main-icon`)
    .setAttribute(`alt`, response.data.condition.description);

  celsiusTemperature = response.data.temperature.current;
}

function showCurrentCity(position) {
  let apiKey = "36f068b85a3t4301a8fo4942f0d454f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentCity);
}

function searchCity(city) {
  let apiKey = "36f068b85a3t4301a8fo4942f0d454f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function searchPlace(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
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
