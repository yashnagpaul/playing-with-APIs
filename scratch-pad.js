const weatherKey = "ca860df01c47b4f3d25b870a2362baa3";
const unsplashKey = "Kye91epBWPDaMYAGvuOGSXYtz8VOorRB3cCzlwjdYyg";

function submitHandler(event) {
  event.preventDefault();

  let cityName = event.target.city_input.value;
  let textArea = event.target.output_text;

  axios
    .get("https://api.openweathermap.org/data/2.5/weather?", {
      params: { appid: weatherKey, q: cityName },
    })
    .then((result) => {
      textArea.innerText = `${Math.round(
        result.data.main.temp - 273.1
      )}\xB0 Celsius and ${result.data.weather[0].main}`;
      outputArea = document.querySelector("textarea");

      iconUrl = `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`;
      console.log(iconUrl);
      weatherIconDiv = document.getElementsByClassName("main__weather-icon");
      console.log(weatherIconDiv);
      weatherIconDiv.innerHTML = `<img src='${iconUrl}'>`;
      console.log(weatherIconDiv.innerHTML);
    });

  // get a photo that is relevant to the user's search query (from Unsplash API)

  axios
    .get("https://api.unsplash.com/search/photos?", {
      params: {
        client_id: unsplashKey,
        query: `${cityName} skyline`,
        per_page: 1,
        query: event.target.city_input.value,
      },
    })
    .then((result) => {
      document.body.style.backgroundImage = `url( ${result.data.results[0].urls.regular} )`;
    });
}

// tell our code to find the "form" in the DOM + add an event listener function to it

let form = document.querySelector(".main__form");
form.addEventListener("submit", submitHandler);
