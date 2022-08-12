import './style.css';
const header = document.createElement("div");
const menu = document.createElement("div");
const btnUnit = document.createElement("button");
const txtUnit = document.createElement("p");
const content = document.createElement("div");
const txtTemp = document.createElement("p");
const wetherIcon = document.createElement("img");
const txtWeatherType = document.createElement("p");
const inputLocation = document.createElement("input");
const btnSearch = document.createElement("button");
const iconWrapper = document.createElement("div");
const footer = document.createElement("div");
const footerText = document.createElement("a");

// header
header.textContent = "⛅ Weather app ☔";
header.classList.add("header");

//menu
menu.classList.add("menu");
btnUnit.classList.add("btnUnit");
btnUnit.textContent = "°C";
txtUnit.textContent = "Units: Metric";

//content
content.classList.add("content");
//content-txtTemp
txtTemp.classList.add("txtTemp");
txtTemp.textContent = `~ °C`;
//content-weatherIcon
wetherIcon.classList.add("wetherIcon");
wetherIcon.src =
  "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg";
//content-txtWeatherType
txtWeatherType.classList.add("txtWeatherType");
txtWeatherType.textContent = "-";
//content-inputLocation
inputLocation.classList.add("inputLocation");
inputLocation.placeholder = "Enter a town/city";
//content-bntSearch
btnSearch.classList.add("btnSearch");
btnSearch.textContent = "Search";

//footer
footer.classList.add("footer");
footerText.textContent = "Icons provided by Bas Milius";
footerText.href = "https://bas.dev/work/meteocons";

//appends
document.body.append(header, menu, content, footer);
menu.append(txtUnit, btnUnit);
content.append(txtTemp, wetherIcon, txtWeatherType, inputLocation, btnSearch);
footer.appendChild(footerText);

//code
let units = "metric";
async function getWeather(units) {
  try {
    // let inputLocation = document.querySelector("inputLocation").value;
    let city = inputLocation.value;
    const location = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=3444792808e73e38eb74b8418397a304`
    );
    const locationData = await location.json();
    // console.log(weatherData);
    // console.log(`Name: ${locationData[0].name}`);
    // console.log(`Latitude: ${locationData[0].lat}`);
    // console.log(`Longitude: ${locationData[0].lon}`);
    // console.log(`Country: ${locationData[0].country}`);
    let lat = locationData[0].lat;
    let lon = locationData[0].lon;
    // console.log(`Latitude: ${lat}`)
    // console.log(`Longitude: ${lon}`)
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=3444792808e73e38eb74b8418397a304`
    );
    const weatherData = await weather.json();
    console.log(locationData[0].name);
    console.log(
      `Current Weather: ${weatherData.weather[0].main} Temp: ${weatherData.main.temp}`
    );
    let temp = weatherData.main.temp;
    let weatherType = weatherData.weather[0].main;
    let name = locationData[0].name;

    updateWeather(weatherType, temp, name);
  } catch (err) {
    // error handling logic
    console.log(err);
  }
}

btnUnit.addEventListener("click", function () {
  if (units == "metric") {
    units = "imperial";
    btnUnit.textContent = "°F";
    txtUnit.textContent = "Units: Imperial";
    getWeather(units)
  } else {
    units = "metric";
    btnUnit.textContent = "°C";
    txtUnit.textContent = "Units: Metric";
    getWeather(units)
  }
});

btnSearch.addEventListener("click", function () {
  if (inputLocation.value == "") {
    alert("Please enter a valid Town/City");
  } else {
    getWeather(units);
  }
});

inputLocation.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (inputLocation.value == "") {
      alert("Please enter a valid Town/City");
    } else {
      getWeather(units);
    }
  }
});

function updateWeather(weatherType, temp, name) {
  units == "metric"
    ? (txtTemp.textContent = `${temp}°C`)
    : (txtTemp.textContent = `${temp}°F`);
  txtWeatherType.textContent = `${name} - ${weatherType}`;
  let url = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/";
  switch (weatherType) {
    case "Clear":
      wetherIcon.src = `${url}clear-day.svg`;
      break;
    case "Rain":
      wetherIcon.src = `${url}rain.svg`;
      break;
    case "Clouds":
      wetherIcon.src = `${url}cloudy.svg`;
      break;
    case "Thunderstorm":
      wetherIcon.src = `${url}thunderstorms-rain.svg`;
      break;
    case "Drizzle":
      wetherIcon.src = `${url}drizzle.svg`;
      break;
    case "Snow":
      wetherIcon.src = `${url}snow.svg`;
      break;
    case "Mist":
      wetherIcon.src = `${url}mist.svg`;
      break;
    case "Smoke":
      wetherIcon.src = `${url}smoke.svg`;
      break;
    case "Haze":
      wetherIcon.src = `${url}haze.svg`;
      break;
    case "Dust":
      wetherIcon.src = `${url}dust.svg`;
      break;
    case "Fog":
      wetherIcon.src = `${url}fog.svg`;
      break;
    case "Sand":
      wetherIcon.src = `${url}dust-day.svg`;
      break;
    case "Ash":
      wetherIcon.src = `${url}smoke-particles.svg`;
      break;
    case "Squall":
      wetherIcon.src = `${url}wind.svg`;
      break;
    case "Tornado":
      wetherIcon.src = `${url}tornado.svg`;
      break;
    default:
      wetherIcon.src =
        "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg";
  }
}

// api key 3444792808e73e38eb74b8418397a304
// get icons from https://bas.dev/work/meteocons or https://www.amcharts.com/free-animated-svg-weather-icons/
//api docs: https://openweathermap.org/api
