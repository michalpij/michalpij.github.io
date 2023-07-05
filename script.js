document.getElementById("location-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var location = document.getElementById("location").value;
    getWeather(location);
});

function getWeather(location) {
    var apiKey = "875af4f9152f4b2ba33b32dd02b2fc60";
    var currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&city=${location}&units=M`;
    var forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&city=${location}&units=M&days=5`;

    fetch(currentWeatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var currentWeather = data.data[0];
            displayCurrentWeather(currentWeather);
        })
        .catch(function(error) {
            console.log("Error fetching current weather:", error);
        });

    fetch(forecastUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var forecast = data.data;
            displayForecast(forecast);
        })
        .catch(function(error) {
            console.log("Error fetching forecast:", error);
        });
}

function displayCurrentWeather(currentWeather) {
    var forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    var temperature = currentWeather.temp;
    var weatherDescription = currentWeather.weather.description;

    var currentWeatherHTML = `
        <h2>Current Weather</h2>
        <p><strong>Temperature:</strong> ${temperature} &#8451;</p>
        <p><strong>Description:</strong> ${weatherDescription}</p>
    `;

    forecastDiv.innerHTML += currentWeatherHTML;
}

function displayForecast(forecast) {
    var forecastDiv = document.getElementById("forecast");

    var forecastHTML = "<h2>Forecast</h2>";

    for (var i = 1; i < forecast.length; i++) {
        var date = forecast[i].datetime;
        var temperature = forecast[i].temp;
        var weatherDescription = forecast[i].weather.description;

        forecastHTML += `
            <div>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Temperature:</strong> ${temperature} &#8451;</p>
                <p><strong>Description:</strong> ${weatherDescription}</p>
            </div>
        `;
    }

    forecastDiv.innerHTML += forecastHTML;
}
