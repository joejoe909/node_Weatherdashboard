$(document).ready(function () {
    console.log("loaded FE_Logic.js file...")

    function clearReport(){
        $("#name").html("")
        $("#temp").html("");
        $("#description").html("");
        $("#humidity").html("");
        $("#windspeed").html("");
        $("#uvIndex").html("");
        $("5dayforecast").html("");   
    }

    function setUVbackground(value){
        let h4 = $("<h4>");
        console.log("uv value is " + value);
        if(value < 3 ){
            h4.attr("style", "background: green");
        }else if(value < 6 ){
            h4.attr("style", "background: yellow");
        }else if(value < 8){
            h4.attr("style", "background: orange");
        }else{
            h4.attr("style", "background: red");
        }
        h4.html("UV Index: " + value);
        $("#uvIndex").append(h4);
    }

    function buildFDF(data){
        console.log(data);
        $("#5dayforecast").html("");
        let cards = []
        for(i=0; i <= 4; i++)
        { 
            let card = $("<div class='card'><div>");
            card.attr("style", "padding: 10px;")
            let {dt_text, description, humidity, icon, temp} = data.fiveDayFor[i];  
            let dt = dt_text.slice(0,10);
            let date = $("<h8>").html(dt); 
            let icn = $("<img>");
            icn.attr('src', 'https://openweathermap.org/img/wn/' + icon + '@2x.png')
            let des = $("<h8>").html(description);
            let tmp = $("<h8>").html("temp: " + temp + "°")
            let hum = $("<h8>").html("humidity: " + humidity + "%");
            card.append(date);
            card.append(icn);
            card.append(des);
            card.append(tmp);
            card.append(hum);
            cards.push(card);
        }

        for(i=0; i < cards.length; i++)
        {
            $("#5dayforecast").append(cards[i]);
        }  
    }

    //Render Current day
    function renderData(data) 
    {
        //console.log(data);
        clearReport(); //clear the div so we can write new data.
        $("#name").append(data.name);
        const iconImg = $('<img>');
        iconImg.attr('src', 'https://openweathermap.org/img/wn/' + data.icon + '@2x.png');
        $("#name").append(iconImg);
        $("#description").append(data.description);
        $("#temp").append("Temperature: " + data.temp + "° High " + data.temp_max + "° Low " + data.temp_min +"°");
        $("#humidity").append("Humidity: " + data.humidity + "%");
        $("#windspeed").append("Windspeed: " + data.speed + " MPH, Deg: " + data.deg + "°" )
        setUVbackground(data.value);
        buildFDF(data);
    }

    function buildQueryURL(cityString) 
    {
        console.log("rx in buildQueryURL: " + cityString)
        //call a ajax get on the back end or do a fetch...
        $.get("/api/search/" + cityString)
            .then((data) => {    
                renderData(data)
            })
    }

    //Get City name on search
    $("#searchBtn").on("click", function () 
    {
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

    buildQueryURL("Las Vegas");


});

