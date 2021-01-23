const api = {
    key: "3b4eeb9c749cd759c21f4bdbc8591cf4",
    base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector('.search_Box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(e) {
    if (e.keyCode == 13) {
        //calls the below function which makes an api call using the value of the city entered in textbox
        getResults(searchbox.value);

    }
}

//making a api request using fetch 
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayResults);
}



function displayResults(response) {
    console.log(response);

    let city = document.querySelector('.location .city');
    city.innerText = `${response.name},${response.sys.country}`;

    //to get date
    let now = new Date();
    let date = now.getDate();
    let month = now.toLocaleString('default', { month: 'long' });
    let year = now.getFullYear();
    let day = now.toLocaleDateString('default', { weekday: 'long' });


    let today_date = document.querySelector(' .location .date');
    today_date.innerText = `${day},${date}, ${month}, ${year}`;

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(response.main.temp).toFixed(0)}<span>&#176C</span>`;

    let weather = document.querySelector('.current .weather');
    weather.innerText = `${response.weather[0].main} `;

    let hi_low_temp = document.querySelector('.current .hi_low');
    hi_low_temp.innerText = `${Math.round(response.main.temp_min)}°C/ ${Math.round(response.main.temp_max)}°C`;


}




