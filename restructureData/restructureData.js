function normalizeTemp(temp_value) {
    const tmp = (temp_value - 273.15) * 1.8 + 32;
    return Number.parseFloat(tmp).toPrecision(4);
}

module.exports = function restruct(report){
    //console.log("found data");
    //console.log(report);

    const { name, country, population, timezone } = report[0].city;
    const { temp, temp_max, temp_min, humidity } = report[0].list[0].main;
    const { description, icon } = report[0].list[0].weather[0];
    const { deg, speed } = report[0].list[0].wind;

    const tempF = normalizeTemp(temp);
    const temp_maxF = normalizeTemp(temp_max);
    const temp_minF = normalizeTemp(temp_min);

    const Wreport = {
        name: name,
        country: country,
        population: population,
        timezone: timezone,
        temp: tempF,
        temp_max: temp_maxF,
        temp_min: temp_minF,
        humidity: humidity,
        description: description,
        icon: icon,
        deg: deg,
        speed: speed
    }


    return Wreport;
    //console.log("Report now looks like this: ");
   // console.log(Wreport);
}


