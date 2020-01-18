window.addEventListener("load", () => {
  getIpAddress();
  showTime();
});
var setInputToIPAddress = document.querySelector(".ip");
const apiKEY = "4c2526473a35a385d832e5ab7e574174";
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
const flag = document.querySelector(".flag");

searchButton.addEventListener("click", function() {
  alert("Coming Soon");
});

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

function getIpAddress() {
  axios.request("https://www.cloudflare.com/cdn-cgi/trace").then(data => {
    var result = data.data.match(/(?<=ip\=\s*).*?(?=\s*ts\=)/gs);
    const ip_address = result[0];
    axios
      .get(`http://api.ipapi.com/${ip_address}?access_key=${apiKEY}`)
      .then(data => {
        axios.get(`https://freegeoip.app/json/${ip_address}`).then(data => {
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

function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);
}
