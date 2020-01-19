window.addEventListener("load", () => {
  getLocationFromIpAddress();
  ip();
});
var setInputToIPAddress = document.querySelector(".ip");
// API and url's
const apiKEY = "4c2526473a35a385d832e5ab7e574174";
MuslimsalatAPI = "ef2c1b7fb67191240f7cdc2e5716dde2";
MuslimsalatLink = `https://muslimsalat.com/daily.json?key=${MuslimsalatAPI}`;

const date = new Date();
const day = date.getDay() - 1;
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hour = date.getHours();
const minute = date.getMinutes();
const currentTimeDiv = document.querySelector(".current-time");
// prayer timing
const fajr = document.querySelector(".fajr");
const dhuhr = document.querySelector(".dhuhr");
const asr = document.querySelector(".asr");
const maghrib = document.querySelector(".maghrib");
const isha = document.querySelector(".isha");
const countryAndCity = document.querySelector(".countryAndCity");
const searchButton = document.querySelector(".search");
const searchBar = document.querySelector(".searchbar");
const flag = document.querySelector(".flag");

const prayerTime = (Fajr, Dhuhr, Asr, Maghrib, Isha) => {
  // fajr.innerHTML = data.data[0].timings.Fajr.replace("(+03)", "");
  fajr.innerHTML = Fajr;
  dhuhr.innerHTML = Dhuhr;
  asr.innerHTML = Asr;
  maghrib.innerHTML = Maghrib;
  isha.innerHTML = Isha;
};

const getTimeFromIpAddress = api => {
  $.get(api, function(data, status) {
    console.log(data);
    country = data.country_name;
    city = data.city;
    console.log(data);
  });
};

function ip() {
  $.get(
    "https://ipinfo.io/8.8.8.8",
    function(response) {
      console.log(response.ip, response.country);
    },
    "jsonp"
  );

  // axios.get("https://www.ipinfo.io").then(data => {
  //   console.log(data);
  // });
}

function getLocationFromIpAddress() {
  axios.request("https://www.cloudflare.com/cdn-cgi/trace").then(data => {
    var result = data.data.match(/(?<=ip\=\s*).*?(?=\s*ts\=)/gs);
    const ip_address = result[0];
    axios
      .get(`http://api.ipapi.com/${ip_address}?access_key=${apiKEY}`)
      .then(data => {
        axios.get(`https://ipinfo.io?token=$TOKEN`).then(data => {
          console.log(data);
        });
        console.log(data);
        country = data.data.country_name;
        city = data.data.city;
        country_flag = data.data.location.country_flag;

        flag.setAttribute("src", country_flag);
        countryAndCity.innerHTML = city + " - " + country;
        axios
          .get(
            `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8`
          )
          .then(data => {
            console.log(data.data.data.timings);
            timings = data.data.data.timings;
            prayerTime(
              timings.Fajr,
              timings.Dhuhr,
              timings.Asr,
              timings.Maghrib,
              timings.Isha
            );
          });
      });
  });
}
