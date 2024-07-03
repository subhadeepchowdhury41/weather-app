const apikey="7907c59fde7cd1dc34d9aff9b33efa13";
const weatherDataEl= document.getElementById("weather_data");
const cityInputEl=document.getElementById("city_input");
const formEl=document.querySelector("form");

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    const cityValue=cityInputEl.value;
    // console.log(cityValue);

    getWeatherData(cityValue);
})



async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if (!response.ok) {
            // If the response status is not in the range 200-299 (success), handle the error
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Now you can work with the data obtained from the API
        console.log(data);

        const temperature=Math.round(data.main.temp);

        const description=data.weather[0].description;
        
        const icon= data.weather[0].icon;

        const details=[
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`
        ];

        weatherDataEl.querySelector(
            ".icon"
        ).innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        `

        weatherDataEl.querySelector(
            ".temperature"
        ).textContent=`${temperature}°C`

        
        weatherDataEl.querySelector(
            ".description"
        ).textContent=description;


        weatherDataEl.querySelector(".details").innerHTML = details
        .map((detail) => `<div>${detail}</div>`)
        .join("");
      

    } catch (error) {
        
        weatherDataEl.querySelector(
            ".icon"
        ).innerHTML=``

        weatherDataEl.querySelector(
            ".temperature"
        ).textContent=``

        
        weatherDataEl.querySelector(
            ".description"
        ).textContent=`Error! Please try again!!😅`;


        weatherDataEl.querySelector(".details").innerHTML = "";


        console.error('Error fetching weather data:', error);
    }
}

