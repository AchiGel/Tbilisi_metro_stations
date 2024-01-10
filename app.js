const stationsList = document.querySelector(".stations-list");
const searchBar = document.querySelector("#search");
const stations = [];

const api =
  "https://raw.githubusercontent.com/AchiGel/Tbilisi_metro_stations/main/stations.json";

async function getStations() {
  try {
    const response = await fetch(api);
    const dataObj = await response.json();
    const data = await dataObj.stations;

    data.forEach((element) => {
      stations.push(element);
    });
  } catch (error) {
    console.log(error.message);
  }
}

getStations();

function getOptions(word, stations) {
  return stations.filter((s) => {
    const regex = new RegExp(word, "gi");
    return s.name.match(regex);
  });
}

function displayOptions() {
  const options = getOptions(this.value, stations);

  const html = options
    .map((station) => {
      const regex = new RegExp(this.value, "gi");
      const stationName = station.name.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `<li class="option"><div class="option-text"><span>${stationName}</span> <span class="line">${station.line}</span> </div> <img src="${station.img} alt="${station.name}"/></li>`;
    })
    .slice(0, 5)
    .join(" ");

  stationsList.innerHTML = this.value ? html : null;
}

searchBar.addEventListener("change", displayOptions);
searchBar.addEventListener("keyup", displayOptions);
