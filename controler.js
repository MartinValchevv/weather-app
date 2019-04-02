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
    let urlFiveDays = 'https://api.openweathermap.org/data/2.5/forecast?appid=' + appKey + '&q=' + aaa + '&count=5';

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
                    let day = Number(currentTime.getDate())
                    let month = Number(currentTime.getMonth() + 1)
                    let year = currentTime.getFullYear()
                    if (day + index > 30) {
                        day = 0 - index
                        if (index === 4) {
                            day = 0 - index + 1
                        }
                        month = Number(currentTime.getMonth() + 1) + 1
                        if (currentTime.getMonth() === 11) {
                            year += 1
                        }
                    }
                    create += "<h4>Day " + Number((day + 1) + index) + '/' + month + '/' + year + "</h4> "
                    create += "<p>"
                    create += parseInt(val.main.temp - 273) + "&degC / " + (parseInt(val.main.temp - 273) * 9 / 5 + 32).toFixed(1) + "&degF"
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
        let urlFiveDays = 'https://api.openweathermap.org/data/2.5/forecast?appid=' + appKey + '&q=' + searchInput.value + '&count=5';

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
                        let day = Number(currentTime.getDate())
                        let month = Number(currentTime.getMonth() + 1)
                        let year = currentTime.getFullYear()
                        if (day + index > 30) {
                            day = 0 - index
                            if (index === 4) {
                                day = 0 - index + 1
                            }
                            month = Number(currentTime.getMonth() + 1) + 1
                            if (currentTime.getMonth() === 11) {
                                year += 1
                            }
                        }
                        create += "<h4>Day " + Number((day + 1) + index) + '/' + month + '/' + year + "</h4> "
                        create += "<p>"
                        create += parseInt(val.main.temp - 273) + "&degC / " + (parseInt(val.main.temp - 273) * 9 / 5 + 32).toFixed(1) + "&degF"
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
    icon.src = "https://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°C";
    humidity.innerHTML = jsonObject.main.humidity + "%";
    dateNow.innerHTML = currentTime.getDate() + '/' + Number(currentTime.getMonth() + 1) + '/' + currentTime.getFullYear()
    $("#farenhait").click(function(){
        var f=$("#temp").html();
        var c= (parseInt(jsonObject.main.temp - 273) * 9 / 5 + 32).toFixed(0) + "°F"
        $("#temp").html(c);
        $(this).prop("disabled",true);
        $("#celcius").prop("disabled",false);
      });
      $("#celcius").click(function(){
        var c=$("#temp").html();
        var f=parseInt(jsonObject.main.temp - 273) + "°C"
        $("#temp").html(f);
        $(this).prop("disabled",true);
        $("#farenhait").prop("disabled",false);
      });
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

