var chaveApi = "93b347f7dfb91578a45f3fd3ffa6da43";
var apiUnsplash = "https://source.unsplash.com/1600x900/?";

var cidadeInput = document.querySelector("#cidade-input");
var searchBtn = document.querySelector("#search");

var cidadeElement = document.querySelector("#cidade");
var tempElement = document.querySelector("#temperature span");
var descElement = document.querySelector("#description");
var weatherIconElement = document.querySelector("#weather-icon");
var umidityElement = document.querySelector("#umidity span");
var windElement = document.querySelector("#wind span");

var weatherContainer = document.querySelector("#weather-data");
var errorMessageContainer = document.querySelector("#error-message");


var getWeatherData = async (cidade) => {

  var apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveApi}&lang=pt_br`;

  var res = await fetch(apiWeatherURL);
  var data = await res.json();

  return data;
};

// Tratamento de erro
var showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

var hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
};

var showWeatherData = async (cidade) => {
  hideInformation();

  var data = await getWeatherData(cidade);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cidadeElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  // Change bg image
  document.body.style.backgroundImage = `url("${apiUnsplash + cidade}")`;

  weatherContainer.classList.remove("hide");
};

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  var cidade = cidadeInput.value;

  showWeatherData(cidade);
});

cidadeInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    var cidade = e.target.value;

    showWeatherData(cidade);
  }
});
