$(document).ready(function () {
  //  "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=198bc91b6896cf84288eeee42bc1d336"

  var temperature;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial&APPID=198bc91b6896cf84288eeee42bc1d336";
        console.log(queryURL);
        getWeather(queryURL);
      });
    } else {
      console.log("need data");
    }
  }

  function getWeather(queryURL) {
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      var city = response.name;
      temperature = Math.round(response.main.temp);
      var humidity = response.main.humidity;
      var condition = response.weather[0].main;
      var iconCode = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      var code = response.weather[0].icon;

      // console.log(city, temperature, humidity, condition, iconCode, code)

          switch (code) {
            case '11d':
            case '11n':
              $('body').css("background-image", "url('images/stormy.jpg')")
              break;
            case '09d':
            case '09n':
            case '10d':
            case '10n':
              $('body').css("background-image", "url('images/rain.jpg')")
              break;
            case '13d':
            case '13n':
             $('body').css("background-image", "url('images/snow.jpg')")
              break;
            case '01d':
            case '01n':
             $('body').css("background-image", "url('images/clear.jpg')")
              break;
            case '02d':
            case '02n':
            case '03d':
            case '03n':
            case '04d':
            case '04n':
             $('body').css("background-image", "url('images/cloudy.jpg')")
              break;    
            default:
             $('body').css("background-image", "url('images/weather.jpg')")
              break;
          }

      $("#city").text(city);
      $("#condition").text(condition);
      $("#statusIcon").attr("src", iconCode);
      $("#temp").text(temperature + '\u00B0');
      $("#humidity").text(humidity + '\u0025');
    });

  }

  $('#tog-btn').click(function(){
    var currentUnit = $("#degreeUnit").text();

    if (currentUnit === 'F') {
      temperature = Math.round((temperature - 32) * (5/9));
      $("#temp").text(temperature + '\u00B0');
      $("#degreeUnit").text("C");
    } else {
      temperature = Math.round((temperature * 1.8) + 32);
      $("#temp").text(temperature + '\u00B0');
      $("#degreeUnit").text("F");

    }
  })
  getLocation();
});
