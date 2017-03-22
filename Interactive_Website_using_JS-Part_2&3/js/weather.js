if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        loadWeather(position.coords.latitude+','+position.coords.longitude); 
    });
} else {
    $('.not-available').show();
    loadWeather('Kolkata, IN','');
}

$(document).ready(function() {
  setInterval(loadWeather, 10000);
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'c',
        success: function(weather) {
            city = weather.city;
            temp = weather.temp+'&deg;';
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">'
            wind = '<p>'+weather.wind.speed+'</p><p>'+weather.units.speed+'</p>'
            humidity = weather.humidity + ' %';
  
        $(".location").text(city)
        $(".temperature").html(temp);
        $(".weather_logo").html(wcode);
        $(".climate_bg").html(wcode);
        $(".windspeed").html(wind);
        $(".humidity").text(humidity);
        },
    error: function(error) {
        $(".city-weather").html('<p>'+error+'</p>');
    }
    });
}