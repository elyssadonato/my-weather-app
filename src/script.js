let now = new Date();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
function showData(response) {
  let apiKey = "bc74ea37ddf606c1c06f602d803cbb3a";
  let units = "imperial";
  let city = document.querySelector("#search-city-input");
  city = `${city.value}`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}q=${city}&APPID=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
  let cityElement = response.data.name;
  let cityInput = document.querySelector("h1");
  cityInput.innerHTML = `${cityElement}`;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("p");
  currentTemp.innerHTML = `${temperature}`;
  let humidity = response.data.main.humidity;
  let humidityReading = document.querySelector("#humidity");
  humidityReading.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day} ${hour}:${minutes}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", showData);

function showCurrentWeather(response) {
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let temperature = Math.round(response.data.main.temp);
  let p = document.querySelector("p");
  p.innerHTML = `${temperature}`;
  let humidity = response.data.main.humidity;
  let humidityReading = document.querySelector("#humidity");
  humidityReading.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind}`;
}
function showCurrentLocationWeather(position) {
  let apiKey = "bc74ea37ddf606c1c06f602d803cbb3a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  navigator.geolocation.getCurrentPosition(showCurrentLocationWeather);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let button = document.querySelector("#current");
button.addEventListener("click", showCurrentLocationWeather);
