let weather = {
  apiKey: "0efb4fc16a9ed98dc0b3aafd8491d6ad",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");

$("#desc").html("Sky: " + data.weather[0].description);
var fahr = data.main.temp + " °F";
var cels = ((data.main.temp - 32) * 5) / 9 + " °C";
$("#temp").html(fahr);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  console.log(apiUrl);
}
function showForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "<div>";
  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay);
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="forecast-division row">
          <div class="forecast-date col-4">${formatDay(forecastDay.dt)}</div>
          <img src="emoji/${forecastDay.weather[0].icon}.png" alt="${
          forecastDay.weather[0].description
        }" class="forecast-icon col4" />
          <span class="forecast-temp col-4">
            <span class="forecast-temp-max">${Math.round(
              forecastDay.temp.max
            )}</span>°c ~
            <span class="forecast-temp-min">${Math.round(
              forecastDay.temp.min
            )}</span>°c
          </span>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}
