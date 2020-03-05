
//everything will load in this function when page is loaded
window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');
// grabing the latitude and longitude
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
// pulling a api request to get the temperature using our latitude and longitude
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/e573c37a738b124025435aa7bcea9f59/${lat},${long}`;

      fetch(api)
        .then(data => {
          return data.json();
        })
        .then (data =>{
          console.log(data);
          const {temperature, summary, icon} = data.currently;
          //set DOM elements from the api
          temperatureDegree.textContent = Math.floor(temperature);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // forumula for Celsius
          let celsius = (temperature - 32) * (5/9);
          //set icon
          setIcons(icon, document.querySelector('.icon'));

          // Change temperature to Celsius/Farenheit
            temperatureSection.addEventListener('click', () => {
              if(temperatureSpan.textContent === "F"){
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
              } else {
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = Math.floor(temperature);
              }
            })
        });
    });
  }
//picking what icon to use
  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  //set current time
  var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let currentTime = document.querySelector('.current-time');
//change current time  to standard time
var myMilTime = time;
var myStandardTime = milToStandardTime ( myMilTime );
function milToStandardTime(value) {
  if (value !== null && value !== undefined){ //If value is passed in
    if(value.indexOf('AM') > -1 || value.indexOf('PM') > -1){ //If time is already in standard time then don't format.
      return value;
    }
    else {
      if(value.length == 8){ //If value is the expected length for military time then process to standard time.
        var hour = value.substring ( 0,2 ); //Extract hour
        var minutes = value.substring ( 3,5 ); //Extract minutes
        var identifier = 'AM'; //Initialize AM PM identifier

        if(hour == 12){ //If hour is 12 then should set AM PM identifier to PM
          identifier = 'PM';
        }
        if(hour == 0){ //If hour is 0 then set to 12 for standard time 12 AM
          hour=12;
        }
        if(hour > 12){ //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
          hour = hour - 12;
          identifier='PM';
        }
        return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
      }
      else { //If value is not the expected length than just return the value as is
        return value;
      }
    }
  }

};
// displaying the current time to its DOM
currentTime.textContent = myStandardTime;
});
