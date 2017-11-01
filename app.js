$(document).ready(function() {
  //  "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=198bc91b6896cf84288eeee42bc1d336"
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial&APPID=198bc91b6896cf84288eeee42bc1d336";
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
 }).done(function(response) {
    var city = response.name;
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var condition = response.weather[0].main;
    var iconCode = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    var code = response.weather[0].code;

    console.log(city, temperature, humidity, condition, iconCode)
    
//     switch (code) {
          //storm
//       case "11d":
//         $(body).css("background-image", "url(https://report.az/storage/news/b6561e5fd06e28947a3fbb2c8e6a221e/731c8a5a-fe4e-449d-bcef-337dcdb7791e.jpg)")
//         break;
          //rain
//       case "rain":
//         $(body).css("background-image", "url(http)
        
//         break;
          //clear
//       case "snow":
        
//         break;
          //cloudy
//       case "clouds":
        
//         break;    
//       default:

//         break;
//     }

    $("#city").text(city);
    $("#condition").text(condition);
    $("#statusIcon").attr("src", iconCode);
    $("#temp").text(temperature +'\u00B0');
    $("#humidity").text(humidity + '\u0025');
  });
        
}

// function changeUnit(temperature) {

// }
  getLocation();
});
