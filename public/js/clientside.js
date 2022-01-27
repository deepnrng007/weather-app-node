const searchForm = document.querySelector("form");
const searchTerm = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  msg1.textContent = "Loading...";
  fetch("/weather?address=" + searchTerm.value).then((resp) => {
    resp.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
        msg2.textContent = "";
      } else {
        console.log(data);
        msg1.textContent = `The temprature of ${searchTerm.value} is ${data.temperature} degrees`;
        msg2.textContent = `And it feels like ${data.feelslike}`;
      }
    });
  });
});
