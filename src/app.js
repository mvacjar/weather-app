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
  document.querySelector("#city-default").innerHTML = response.data.name;
  document.querySelector("#main-grades").innerHTML = Math.round(
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

let currentButton = document.querySelector(`#current-button`);
currentButton.addEventListener(`click`, currentLocation);

let search = document.querySelector(`#search-place`);
search.addEventListener(`submit`, searchPlace);

let changeDate = document.querySelector("#main-date");
let current = new Date();
changeDate.innerHTML = getDate(current);

searchCity("Stockholm");
