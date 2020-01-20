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

// $.get(
//   "https://ipinfo.io?token=$TOKEN",
//   function(response) {
//     console.log(response.ip, response.country);
//   },
//   "jsonp"
// );
searchButton.addEventListener("click", function() {
  showTime();
});

searchBar.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    showTime();
  }
});

function showTime() {
  searchValue = searchBar.value;
  if (searchValue == "") {
    alert("Please Enter country and city");
  } else {
    search = searchValue.split(",");
    country = search[0];
    country = country.charAt(0).toUpperCase() + country.slice(1);
    city = search[1];

    axios
      .get(
        `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8`
      )
      .then(data => {
        axios
          .get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
          .then(data => {
            console.log(data);
            if (city == null) {
              capital = data.data[0].capital;
              countryAndCity.innerHTML = capital + " - " + country;
            } else {
              countryAndCity.innerHTML = city + " - " + country;
            }

            flagImg = data.data[0].flag;
            flag.setAttribute("src", flagImg);
          })
          .catch(error => {
            console.log(error);
            flag.setAttribute(
              "src",
              "https://img.icons8.com/dusk/64/000000/remove-image.png"
            );
            countryAndCity.innerHTML = country;
          });
        console.log(data.data.data.timings);
        timings = data.data.data.timings;
        prayerTime(
          timings.Fajr,
          timings.Dhuhr,
          timings.Asr,
          timings.Maghrib,
          timings.Isha
        );
      })
      .catch(error => {
        console.log(error);
        alert("Invalid Input, Try country Name , City Name");
      });
    // jQuery(function($) {
    //   $.getJSON(
    //     // `https://muslimsalat.com/london/daily.json?key=${MuslimsalatAPI}&jsoncallback=?`,
    //     `https://muslimsalat.com/london/daily.json?key=${MuslimsalatAPI}Y&jsoncallback=?`,
    //     function(times) {
    //       timings = times.items[0];
    //       console.log(timings);
    //       prayerTime(
    //         timings.fajr,
    //         timings.dhuhr,
    //         timings.asr,
    //         timings.maghrib,
    //         timings.isha
    //       );
    //     }
    //   );
    // });
  }
}
