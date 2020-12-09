$(document).ready(function () {
    console.log("loaded FE_Logic.js file...")
    Handlebars.registerPartial('weather', '{{weather}}');

    function normalizeTemp(temp_value) {
        const tmp = (temp_value - 273.15) * 1.8 + 32;
        return Number.parseFloat(tmp).toPrecision(4);
    }
    //build five day forecast.
    function buildFiveDay(data){
        console.log("inFiveDay...");
        console.log(data);
        let tday = {
            day:[
                {
                    date: "12-19-2020",
                    temp: "78",
                    iconURL: "01d",
                    humidity: "78%",
                    uvIndex: "2%"
                },
                {
                    date: "12-19-2020",
                    temp: "78",
                    iconURL: "01d",
                    humidity: "78%",
                    uvIndex: "2%"
                },
                {
                    date: "12-19-2020",
                    temp: "78",
                    iconURL: "01d",
                    humidity: "78%",
                    uvIndex: "2%"
                }
            ]
        }

        console.log(tday.day[0]);
        console.log(tday.day[1]);
        console.log(tday.day[2]);
        Handlebars.registerHelper('fiveday', function(){
            return this.tday.day[0].date + this.tday.day[0].temp + this.tday.day[0].iconURL + this.tday.day[0].humidity + this.tday.day[0].uvIndex 
        })
    }


    //Render Current day
    function renderData(data) {
        console.log(data)

        document.getElementById('imgspace').innerHTML = '';
        document.getElementById('line1').innerHTML = '';
        document.getElementById('line2').innerHTML = '';
        document.getElementById('line3').innerHTML = '';
        document.getElementById('line4').innerHTML = '';

        const { name, country, population, value, timezone } = data[0].city;
        const { temp, temp_max, temp_min, humidity } = data[0].list[0].main;
        const { description, icon} = data[0].list[0].weather[0];
        const { deg, speed } = data[0].list[0].wind;

        const tempF = normalizeTemp(temp);
        const temp_maxF = normalizeTemp(temp_max);
        const temp_minF = normalizeTemp(temp_min);

        const mainIcon = document.createElement("img");
        mainIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + '@2x.png')

        document.getElementById('line1').innerHTML += name + " " + country;
        document.getElementById('line1').appendChild(mainIcon);
        document.getElementById('line2').innerHTML += "Temperature: " + tempF + " High: " + temp_maxF + " Low: " + temp_minF;
        document.getElementById('line3').innerHTML += "Humidity: " + humidity + "%";
        document.getElementById('line4').innerHTML += "Condition: " + description + ", windspeed: " + speed + " MPH, " + deg + "° " 
        buildFiveDay(data);
    }

    function buildQueryURL(cityString) {
        console.log("rx in buildQueryURL: " + cityString)
        //call a ajax get on the back end or do a fetch...
        $.get("/api/search/" + cityString)
            .then((data) => {
                //console.log('rx response')
                //console.log(data);
                renderData(data)
            })
    }

    //Get City name on search
    $("#searchBtn").on("click", function () {
        event.preventDefault();
        console.log('click');
        const cityStr = $("#cityInpt").val();
        console.log("searching " + cityStr);
 
        //check if city is already in the list if is don't add it. 
        let tbody = document.getElementById("tabelBody");
        let cells = tbody.getElementsByTagName("h5");
 
        let found = false
        let city;
        for(let i = 0; i < cells.length; i++)
        {
            if(cityStr === cells[i].innerText){
                 found = true;
                 city = cells[i].innerText;
            }
        }

        if(!found){
            const cty = '<tr>' + '<td id="' + city + '">' + '<h5>' + cityStr + '</h5>' + '</td>' + '</tr>'
            $('#tabelBody').prepend(cty); 
        }
        buildQueryURL(cityStr);

    });

    //City List logic
    $("#cityList").on("click", "tr", function () { //event delegation!
        var city = $(this).attr('id');
        cityString = $(this).text();
        cityString = cityString.trim()//cityString.replace(/\s/g, ''); // remove spaces introduced from back end        
        buildQueryURL(cityString);

    });


});

