$(document).ready(function () {
    console.log("loaded FE_Logic.js file...")
    Handlebars.registerPartial('weather', '{{weather}}');

    function normalizeTemp(temp_value) {
        const tmp = (temp_value - 273.15) * 1.8 + 32;
        return Number.parseFloat(tmp).toPrecision(4);
    }

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
       
        //check if city name is in the history list if it is dont add the name
        const cities = $("#tabelBody").contents().filter(function(){ 
            return this.nodeType === 3;  //
        });
        
        console.log("cities is type of: " + typeof(cities))
        let found = false;
        for(let i = 0; i < cities.length; i++)
        {   
            console.log("searching" + String(cities[i]))
            if(String(cities[i]) === cityStr) found ===true;
        }

        if(!found){
            const cty = '<tr>' + '<td id="' + cityStr + '">' + cityStr + '</td>' + '</tr>'
            $('#tabelBody').prepend(cty);    
        }else{
            console.log("found!")
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

