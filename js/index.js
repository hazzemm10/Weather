
var searchLocation = document.getElementById('searchLocation');
var today = document.getElementById('today');
var todayDate = document.getElementById('today-date');
var location = document.getElementById('location');
var todayDegree = document.getElementById('today-degree');
var todayDescription = document.getElementById('today-description');
var todayIcon = document.getElementById('today-icon');
var humidity = document.getElementById('humidty');
var wind = document.getElementById('wind');
var compass = document.getElementById('compass');
var wind = document.getElementById('wind');
var nextDay =document.getElementById('nextDay')
var nextDayIcon = document.getElementById('nextDay-icon');
var maxDegree =document.getElementById('max-degree');
var minDegree = document.getElementById('min-degree');
var afterNextDay = document.getElementById('afterNextDay');
var nextDayDescription = document.getElementById('nextDay-description');

var afterNextDayIcon = document.getElementById('afterNextDay-icon');
var afterNextDayDesc = document.getElementById('afterNextDay-desc');
var afterNextDayMax = document.getElementById('afterNextDay-max');
var afterNextDayMin = document.getElementById('afterNextDay-min');

var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["Jan","Feb","Mars","April","May","June","July","Augt","Sep","Oct","Nov","Dec"];
var apiResponse;
var apiResponseData;
var date, city

async function getCity(city = 'cairo'){
 apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${city}&days=3`)
 apiResponseData =await apiResponse.json();
 
     displayTodayWeather();
     nextDayWeather()

}
getCity()

function displayTodayWeather(){
      date = new Date();     
     today.innerHTML=  days[date.getDay()];
     todayDate.innerHTML =` ${date.getDate()} ${months[date.getMonth()]}`;
     location.innerHTML = apiResponseData.location.name;
     todayDegree.innerHTML = apiResponseData.current.temp_c;
     todayDescription.innerHTML = apiResponseData.current.condition.text;
     todayIcon.setAttribute("src",`https:${apiResponseData.current.condition.icon}`);
     humidity.innerHTML = apiResponseData.current.humidity;
     wind.innerHTML = apiResponseData.current.wind_kph;
     compass.innerHTML = apiResponseData.current.wind_dir;
     
}



function nextDayWeather(){
     date = new Date();
     for(var i=0;i<days.length;i++){
          if (date.getDay() == 6){
               nextDay.innerHTML = days[0];
               afterNextDay.innerHTML = days[1]
          }
          else{
               nextDay.innerHTML = days[date.getDay() + 1]
               afterNextDay.innerHTML = days[date.getDay() + 2]
          }
          
     }

     nextDayIcon.setAttribute("src",`https:${apiResponseData.forecast.forecastday[1].day.condition.icon}`)
     maxDegree.innerHTML = apiResponseData.forecast.forecastday[1].day.maxtemp_c;
     minDegree.innerHTML = apiResponseData.forecast.forecastday[1].day.mintemp_c;
     nextDayDescription.innerHTML = apiResponseData.forecast.forecastday[1].day.condition.text;

     afterNextDayIcon.setAttribute("src",`https:${apiResponseData.forecast.forecastday[2].day.condition.icon}`)
     afterNextDayMax.innerHTML = apiResponseData.forecast.forecastday[2].day.maxtemp_c;
     afterNextDayMin.innerHTML =  apiResponseData.forecast.forecastday[2].day.mintemp_c;
     afterNextDayDesc.innerHTML =  apiResponseData.forecast.forecastday[2].day.condition.text;
}

searchLocation.addEventListener("keyup", function(){
 city = searchLocation.value;
  getCity(city)
})