const enumIcon = {
    'Sunny': '&#x2600', // ☀
    'Partly sunny': '&#x26C5', // ⛅
    'Overcast': '&#x2601', // ☁
    'Rain': '&#x2614', // ☂
    'Degrees': '&#176',  // °
};
function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather)
}
async function getWeather() {
    let url = 'http://localhost:3030/jsonstore/forecaster/locations';
    let townName = document.getElementById('location').value;
    let response = await fetch(url);
    let data = await response.json();

    let info = data.find(x => x.name === townName);

    createForecaster(info.code);
}
async function createForecaster(code) {
    let currectSection = document.getElementById('current');

    let forecastContainer = document.getElementById('forecast');

    let urlToday = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
    let urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

    // TODO use Promise.all -> комплектова няколко заявки в една и си изпраща масив от заяки и получава масив от Promise

    let resonseToday = await fetch(urlToday);
    let dataToday = await resonseToday.json();Виж

    let upcomingContainer = document.getElementById('upcoming');

    let responseUpcoming = await fetch(urlUpcoming);
    let dataUpcoming = await responseUpcoming.json();

    forecastContainer.style.display = 'block';
    let todayHTMLTemp = createToday(dataToday);
    currectSection.appendChild(todayHTMLTemp);

    let upcomingHTMLTemp = createUpcoming(dataUpcoming);
    upcomingContainer.appendChild(upcomingHTMLTemp);
}
function createUpcoming(data) {
    let conatainer = document.createElement('div');
    conatainer.classList.add('forecast-info');

    data.forecast.forEach(data => {
        let spanHolder = generateSpans(data);
        conatainer.appendChild(spanHolder);
    });

    return conatainer;
}

function generateSpans(data) {
    const { condition, high, low } = data;

    let spanHolder = document.createElement('span');
    spanHolder.classList.add('upcoming');

    let iconSpan = document.createElement('span');
    iconSpan.classList.add('symbol');
    iconSpan.innerHTML = enumIcon[condition];

    let tempSpan = document.createElement('span');
    tempSpan.classList.add('forecast-data');
    tempSpan.innerHTML = `${low}${enumIcon['Degrees']}/${high}${enumIcon['Degrees']}`;

    let conditionSpan = document.createElement('span');
    conditionSpan.classList.add('forecast-data');
    conditionSpan.textContent = condition;

    spanHolder.appendChild(iconSpan);
    spanHolder.appendChild(tempSpan);
    spanHolder.appendChild(conditionSpan);

    return spanHolder;

}

function createToday(data) {
    const { condition, high, low } = data.forecast;

    let conditionContainer = document.createElement('div');
    conditionContainer.classList.add('forecasts');



    let conditionIconSpan = document.createElement('span');
    conditionIconSpan.classList.add('condition', 'symbol');
    conditionIconSpan.innerHTML = enumIcon[condition]

    let conditionSpan = document.createElement('span');
    conditionSpan.classList.add('condition');

    let nameSpan = document.createElement('span');
    nameSpan.classList.add('forecast-data');
    nameSpan.textContent = data.name;

    let tempSpan = document.createElement('span');
    tempSpan.classList.add('forecast-data');
    tempSpan.innerHTML = `${low}${enumIcon['Degrees']}/${high}${enumIcon['Degrees']}`;

    let conditionTxtSpan = document.createElement('span');
    conditionTxtSpan.classList.add('forecast-data');
    conditionTxtSpan.textContent = condition;

    conditionSpan.appendChild(nameSpan);
    conditionSpan.appendChild(tempSpan);
    conditionSpan.appendChild(conditionTxtSpan);

    conditionContainer.appendChild(conditionIconSpan);
    conditionContainer.appendChild(conditionSpan);

    return conditionContainer;

}
attachEvents();