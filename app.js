// https://api.weatherapi.com/v1/current.json?key=f01661d3ed6b4ba2bdb193132232801&q=Sinop&aqi=no

const weather = document.querySelector(".weather");

const input = document.querySelector("#city");

const main = document.querySelector("main");

let cityList = JSON.parse(localStorage.getItem("cityList")) || [];

window.addEventListener("load", () => {
  input.focus();
  getCityListFromLocalStorage();
});

const getCityListFromLocalStorage = () => {
  cityList.forEach((city) => createCity(city));
};

input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    getWeatherNews();
  }
});

const getWeatherNews = async () => {
  if (input.value.trim() === "") {
    alert("please enter city :(");
    return;
  }
  const city = input.value.toUpperCase();
  const API_KEY = "f01661d3ed6b4ba2bdb193132232801";
  const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

  const res = await fetch(URL);
  const data = await res.json();

  const cityObj = {
    id: data,
    city: city,
  };

  let flag = true;
  cityList.map((obj) => {
    if (obj.city == city) {
      flag = false;
    }
  });
  if (flag) {
    createCity(cityObj);
    cityList.push(cityObj);
    localStorage.setItem("cityList", JSON.stringify(cityList));
  } else {
    alert("Please enter different city :(");
  }

  input.value = "";
  input.focus();
};

const createCity = (cityObj) => {
  const div = document.createElement("div");
  div.setAttribute(
    "class",
    "weather m-1 p-1 border border-2 rounded bg-light col-3  p-1"
  );
  div.setAttribute("city", `${cityObj.city}`);
  const p1 = document.createElement("p");
  p1.innerText = ` ${cityObj.city}`;
  const icon = document.createElement("i");
  icon.setAttribute("class", "fa-solid fa-location-dot");
  p1.prepend(icon);
  div.append(p1);
  const p2 = document.createElement("p");
  p2.innerText = `${cityObj.id.current.temp_c}`;
  const sup = document.createElement("sup");
  sup.innerText = `o`;
  const span = document.createElement("span");
  span.innerText = `C`;
  p2.append(sup);
  p2.append(span);
  div.append(p2);
  const p3 = document.createElement("p");
  p3.innerText = `${cityObj.id.current.last_updated}`;
  div.append(p3);
  const p4 = document.createElement("p");
  p4.innerText = `${cityObj.id.current.condition.text}`;
  div.append(p4);
  const img = document.createElement("img");
  img.setAttribute("src", `${cityObj.id.current.condition.icon}`);
  div.append(img);
  const button = document.createElement("button");
  button.innerText = "x";
  button.setAttribute("class", "button");
  div.append(button);

  main.append(div);
};

main.addEventListener("click", (e) => {
  const cityBtn = e.target.closest("div").getAttribute("city");
  e.target.parentElement.remove();
  cityList = cityList.filter((obj) => obj.city != cityBtn);

  localStorage.setItem("cityList", JSON.stringify(cityList));
});
