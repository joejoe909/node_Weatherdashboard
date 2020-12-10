$(document).ready(function () {
    console.log("loaded FE_Logic.js file...")

 
    //build five day forecast.
    function buildFiveDay(data){
 
    }


    //Render Current day
    function renderData(data) {

    }

    function buildQueryURL(cityString) {
        console.log("rx in buildQueryURL: " + cityString)
        //call a ajax get on the back end or do a fetch...
        $.get("/api/search/" + cityString)
            .then((data) => {
                //console.log('rx response')
                console.log(data);
                //renderData(data)
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

