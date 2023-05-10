// * * *   T H E   W E A T H E R   * * *
// API_KEY
const latitude = 51.11;
const longitude = 17.04;
const apiKey = process.env.KEY;
const apiWeatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

// GET DATA FROM API
function getWeatherData() {
  //   console.log(apiWeatherLink);

  fetch(apiWeatherLink).then(function (response) {
    response.json().then(function (data) {
      // console.log(data);
      updateWeatherData(data);
    });
  });
}

function updateWeatherData(data) {
  const weather = data.weather[0].main;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const city = data.name;

  document.getElementById("weather").innerHTML = weather;
  document.getElementById("temperature").innerHTML =
    Math.round(temperature) + "&#8451;";
  document.getElementById("cityName").innerHTML = city;

  let imgUrl =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
  document.getElementById("currentWeatherImg").setAttribute("src", imgUrl);
}

export default getWeatherData;
