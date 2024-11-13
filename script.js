const apiKey = "f45bb09395de948810bb54b5822fcecb";
const WeatherDataEle = document.querySelector(".weather-data");
const CityNameEle = document.querySelector("#CityName");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");
formEle.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(CityNameEle.value);
  const cityValue = CityNameEle.value;

  getWeatherData(cityValue);
});
async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response is not ok");
    }
    const data = await response.json();
    console.log(data);
    let temp = Math.floor(data.main.temp);
    let feelsLike = data.main.feels_like;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let discription = data.weather[0].description;
    let icon = data.weather[0].icon;

    WeatherDataEle.querySelector(".temp").textContent = `${temp}℃`;
    WeatherDataEle.querySelector(".desc").textContent = `${discription}`;
    imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;
    const details = [
      `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`,
    ];
    WeatherDataEle.querySelector("#dp").classList.add("details");
    WeatherDataEle.querySelector(".details").innerHTML = details
      .map((detail) => {
        return `<div>${detail}</div>`;
      })
      .join("");
  } catch (error) {
    WeatherDataEle.querySelector("#dp").classList.remove("details");
    WeatherDataEle.querySelector("#dp").classList.add("detailsNo");
    WeatherDataEle.querySelector(".temp").textContent = "";
    WeatherDataEle.querySelector(".desc").textContent = "An Error Occurred!";
    imgIcon.innerHTML = "";
  }
}
