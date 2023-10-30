const api_key = "6c09909da979bcd7bc1ad386c848110f"
const api_url = "https://api.openweathermap.org/data/2.5/weather?&appid=6c09909da979bcd7bc1ad386c848110f&units=metric&q="
const weather_icon = document.querySelector(".weather-icon")

const search = document.querySelector(".search input")
const search_btn = document.querySelector(".search button")

const checkWeather = async (cityname) => {
    const res = await fetch(api_url + cityname + `&appid=${api_key}`)

    if (res.status == 404) {
        document.querySelector(".err").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else {

        var jsonData = await res.json()

        // console.log(jsonData);

        document.querySelector(".city").innerHTML = jsonData.name
        document.querySelector(".temp").innerHTML = Math.round(jsonData.main.temp) + ".c"
        document.querySelector(".humidity").innerHTML = jsonData.main.humidity + "%"
        document.querySelector(".wind").innerHTML = jsonData.wind.speed + "km/h"


        document.querySelector(".weather").style.display = "block"
        document.querySelector(".err").style.display = "none"

        if (jsonData.weather[0].main == "Clouds") {
            weather_icon.src = "images/clouds.png"
        }
        else if (jsonData.weather[0].main == "Clear") {
            weather_icon.src = "images/clear.png"
        }
        else if (jsonData.weather[0].main == "Rain") {
            weather_icon.src = "images/rain.png"
        }
        else if (jsonData.weather[0].main == "Drizzle") {
            weather_icon.src = "images/drizzle.png"
        }
        else if (jsonData.weather[0].main == "Mist") {
            weather_icon.src = "images/mist.png"
        }

    }


}

search_btn.addEventListener("click", () => {
    checkWeather(search.value)
})

search.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(search.value);
    }
})