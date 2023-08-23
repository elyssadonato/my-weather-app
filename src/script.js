function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <img
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png"
      alt=""
      id="icon"
      />
      <h6>${day}</h6>
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-max">112°</span>/
        <span class="weather-forecast-min">84°</span>
      </div>
    </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function showCurrentWeather(response) {
  console.log(response.data);
  fahrenheitTemperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("p");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.city;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.condition.description;
  let dateElement = document.querySelector("h2");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}
function search(city) {
  let apiKey = "8o3ccc0d0a7ft8b8a4d8aca2779a97af";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  search(cityInput.value);
}
function showCelciusTemp(event) {
  event.preventDefault();
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("p");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("p");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
search("Chandler");
displayForecast();

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemp);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);
