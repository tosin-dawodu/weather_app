const setDate = document.getElementById("date");
const setTime = document.getElementById("time");
const place = document.getElementById("location");
const temperature = document.getElementById("temp");
const content = document.getElementById("content");
const img = document.getElementById("img");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");

/**
 * set initial values for the dynamic UI
 */
const emptyDate = new Date().toString();
const separateDate = emptyDate.split(" ");
setDate.innerText = `${separateDate[0]} ${separateDate[1]} ${separateDate[2]} ${separateDate[3]} `;
setTime.innerText = `${separateDate[4]}`;
content.innerText = `It is 23% humid and I am happy`;

/**
 * personal API details for OpenWeatherMap API
 */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "7997728d45aa9d0df8387d61cfa492bb&units=imperial";

/**
 * create a function to call weather API and pass in values for required keys
 */
const fetchWeather = async (zipCode) => {
  const response = await fetch(`${baseUrl}?zip=${zipCode}&appid=${apiKey}`);

  try {
    const responseJson = await response.json();
    const returnValue = {
      dt: responseJson.dt,
      timeZone: responseJson.timezone,
      temp: responseJson.main.temp,
      stateName: responseJson.name,
      country: responseJson.sys.country,
      humidity: responseJson.main.humidity,
    };
    updateUi(returnValue);
  } catch (error) {
    alert("ZIP Code not found in the US");
  }
};

/**
 * create function to post data to server
 */
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "same-origin",
  });
  try {
    await response.text();
  } catch (error) {
    console.log(error);
  }
};

/**
 * create click event for the button
 */
generate.addEventListener("click", () => {
  console.log("TOSIN");
  fetchWeather(zip.value);
  const requestData = {
    zipCode: zip.value,
    feeling: feelings.value,
  };
  postData("/all", requestData);
});
/**
 * create a function to dynamically change the UI based on zip code value
 */
const updateUi = function (response) {
  temperature.innerText = `${tempCelsius(response.temp)} °C`;
  place.innerText = `${response.stateName}, ${response.country}`;
  const time = new Date((response.dt + response.timeZone) * 1000).toUTCString();
  const t = new Date().getTime();

  img.setAttribute("src", dynamicImg(tempCelsius(response.temp)));
  console.log(img.getAttribute("src"));

  const splitDate = time.split(" ");
  setDate.innerText = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]} ${splitDate[3]} `;
  setTime.innerText = `${splitDate[4]}`;
  content.innerText = ` It is ${response.humidity}% humid and I am ${feelings.value} `;
};

const tempCelsius = function (fahrenheit) {
  return ((fahrenheit - 32) * (5 / 9)).toFixed(2);
};

const dynamicImg = (temperature) => {
  temperatureInt = parseFloat(temperature);
  console.log(temperatureInt);
  if (temperature < 0) {
    return "img/snow.svg";
  } else if (temperature < 10) {
    return "img/raining.svg";
  } else if (temperature < 24) {
    return "img/windy.svg";
  } else {
    return "img/sunny.svg";
  }
};
