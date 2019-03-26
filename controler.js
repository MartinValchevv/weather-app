const appKey = "5dd393f7e456aa299405e657419de369";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");
let dateNow = document.getElementById("current-date")

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

let currentTime = new Date()

function currentTown() {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + "Sofia" + "&appid=" + appKey;
    httpRequestAsync(searchLink, theResponse);
    let aaa = 'Sofia'
    let urlFiveDays = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + appKey + '&q=' + aaa + '&count=5';

    $.ajax({
        url: urlFiveDays,
        dataType: "json",
        type: "GET",
        success: function (data) {
            let create = "";
            create += "<h2>" + data.city.name + "</h2>";
            $.each(data.list, function (index, val) {
                if (index > 4) {
                    return
                } else {
                    create += "<h4>Day " + Number(index+1) + "</h4> "
                    create += "<p>"
                    create += parseInt(val.main.temp - 273) + "&degC / " + (parseInt(val.main.temp - 273) * 9 /5 + 32).toFixed(1) + "&degF"
                    create += "<span> " + val.weather[0].description + "</span>";
                    create += "</p>"
                    create += "<div>"
                    create += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"
                    create += "</div>"
                }
                $(".five-days").html(create);
            });
        }
    });
}

function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (searchInput.value === "") {

    } else {
        let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink, theResponse);
        let urlFiveDays = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + appKey + '&q=' + searchInput.value + '&count=5';

        $.ajax({
            url: urlFiveDays,
            dataType: "json",
            type: "GET",
            success: function (data) {
                var create = "";
                create += "<h2>" + data.city.name + "</h2>";
                $.each(data.list, function (index, val) {
                    if (index > 4) {
                        return
                    } else {
                        create += "<h4>Day " + index + "</h4> "
                        create += "<p>"
                        create += parseInt(val.main.temp - 273) + "&degC / " + (parseInt(val.main.temp - 273) * 9 /5 + 32).toFixed(1) + "&degF"
                        create += "<span> " + val.weather[0].description + "</span>";
                        create += "</p>"
                        create += "<div>"
                        create += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"
                        create += "</div>"
                    }
                    $(".five-days").html(create);
                });
            }
        });
    }
}

function theResponse(response) {
    let jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°C";
    humidity.innerHTML = jsonObject.main.humidity + "%";
    dateNow.innerHTML = currentTime.getDate() + '/' + Number(currentTime.getMonth()+1) + '/' + currentTime.getFullYear()
}

function httpRequestAsync(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

