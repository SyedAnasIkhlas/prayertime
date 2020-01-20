// PrayerTime  -- http://praytimes.org/

// ipify api
const ipifyAPI = `at_OswhZc9ON1vknB681tfHdrS6sFuHY`;
const url = `https://geo.ipify.org/api/v1?apiKey=${ipifyAPI}`;

// opencagedata ap
let opencagedataLat;
let opencagedataLong;
const opencagedataAPI = "855caac6c9d342b58f9a9a789e0c8620";
// const opencagedataURL = `https://api.opencagedata.com/geocode/v1/json?key=${opencagedataAPI}&q=${opencagedataLat}.${opencagedataLong}&pretty=1`;
let opencagedataURL = `https://api.opencagedata.com/geocode/v1/json?q=${opencagedataLat}+${opencagedataLong}&key=${opencagedataAPI}&pretty=1`;

// Date
const date = new Date();

// GETTING HTML TAGS
const imsak = document.querySelector(".imsak");
const fajr = document.querySelector(".fajr");
const sunrise = document.querySelector(".sunrise");
const dhuhr = document.querySelector(".dhuhr");
const asr = document.querySelector(".asr");
const maghrib = document.querySelector(".maghrib");
const isha = document.querySelector(".isha");
const midnight = document.querySelector(".midnight");
const countryAndCity = document.querySelector(".countryAndCity");
const searchButton = document.querySelector(".search");
const searchBar = document.querySelector(".searchbar");
const flag = document.querySelector(".flag");

// on page load
window.addEventListener("load", () => {
  geoFindFromLatAndLong();
});

searchButton.addEventListener("click", () => {
  showSearchTime();
});

searchBar.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    showSearchTime();
  }
});

// set time
const setPrayerTime = (
  Imsak,
  Fajr,
  Sunrise,
  Dhuhr,
  Asr,
  Maghrib,
  Isha,
  Midnight
) => {
  imsak.innerHTML = Imsak;
  fajr.innerHTML = Fajr;
  sunrise.innerHTML = Sunrise;
  dhuhr.innerHTML = Dhuhr;
  asr.innerHTML = Asr;
  maghrib.innerHTML = Maghrib;
  isha.innerHTML = Isha;
  midnight.innerHTML = Midnight;
};

// Get Time From Lat And Long
function geoFindFromLatAndLong() {
  // const status = document.querySelector('#status');
  // const mapLink = document.querySelector('#map-link');

  // mapLink.href = '';
  // mapLink.textContent = '';

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const getTime = prayTimes.getTimes(
      date,
      [latitude, longitude],
      "auto",
      "",
      "12h"
    );
    opencagedataLat = latitude;
    opencagedataLong = longitude;
    opencagedataURL = `https://api.opencagedata.com/geocode/v1/json?q=${opencagedataLat}+${opencagedataLong}&key=${opencagedataAPI}&pretty=1`;
    axios.get(opencagedataURL).then(data => {
      country = data.data.results[0].components.country;
      country_code = data.data.results[0].components.country_code;
      city = data.data.results[0].components.city;

      //   countryflag.io url
      let flageImageUrl = `https://www.countryflags.io/${country_code}/flat/64.png`;
      flag.setAttribute("src", flageImageUrl);
      countryAndCity.innerHTML = city + " - " + country;
    });
    setPrayerTime(
      getTime.imsak,
      getTime.fajr,
      getTime.sunrise,
      getTime.dhuhr,
      getTime.asr,
      getTime.maghrib,
      getTime.isha,
      getTime.midnight
    );
    console.log(getTime);

    status.textContent = "";
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
    alert(status.textContent);
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
    alert(status.textContent);
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

function showSearchTime() {
  searchValue = searchBar.value;
  if (searchValue == "") {
    alert("Please Enter country and city");
  } else {
    axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${searchValue}&key=${opencagedataAPI}`
      )
      .then(res => {
        const searchTime = prayTimes.getTimes(
          date,
          [res.data.results[0].geometry.lat, res.data.results[0].geometry.lng],
          "auto",
          "",
          "12h"
        );
        country = res.data.results[0].components.country;
        country_code = res.data.results[0].components.country_code;
        city = res.data.results[0].components.city;
        flag.setAttribute(
          "src",
          `https://www.countryflags.io/${country_code}/flat/64.png`
        );
        countryAndCity.innerHTML = city + " - " + country;
        setPrayerTime(
          searchTime.imsak,
          searchTime.fajr,
          searchTime.sunrise,
          searchTime.dhuhr,
          searchTime.asr,
          searchTime.maghrib,
          searchTime.isha,
          searchTime.midnight
        );
      })
      .catch(error => {
        console.log(error);
        alert("Sorry we can't find timing for " + searchValue);
      });
  }
  // 059 812 5273
}
