$(document).ready(function() { 
    console.log("loaded FE_Logic.js file...")

    function renderData(data){
        console.log(data)
        console.log(data[0].city.name);
        console.log(data[1][0].value); //get the UV index
    }

    function buildQueryURL(cityString){
        console.log("rx in buildQueryURL: " + cityString)
        //call a ajax get on the back end or do a fetch...
        $.get("/api/search/" + cityString)
        .then((data)=>{
            //console.log('rx response')
            //console.log(data);
            renderData(data)
        })
    }

    //Get City name on search
    $("#searchBtn").on("click", function () {
        event.preventDefault();
        console.log('click');
        let cityStr = $("#cityInpt").val();
        console.log(cityStr);
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

