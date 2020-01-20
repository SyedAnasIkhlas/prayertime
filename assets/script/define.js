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
