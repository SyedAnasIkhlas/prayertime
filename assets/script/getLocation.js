window.addEventListener("load", () => {
  axios.request("https://api.ipify.org?format=json").then(data => {
    console.log(data);
  });
});
