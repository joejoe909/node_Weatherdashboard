function normalizeTemp(temp_value) {
    const tmp = (temp_value - 273.15) * 1.8 + 32;
    return Number.parseFloat(tmp).toPrecision(4);
}

module.exports = function restruct(report){
    const { name, country, population, timezone } = report[0].city;
    const { temp, temp_max, temp_min, humidity } = report[0].list[0].main;
    const { description, icon } = report[0].list[0].weather[0];
    const { deg, speed } = report[0].list[0].wind;
    const {value} = report[1]; //get the current UV index.

    const tempF = normalizeTemp(temp);
    const temp_maxF = normalizeTemp(temp_max);
    const temp_minF = normalizeTemp(temp_min);
    
    let fiveDayFor = [];

    for(i = 0; i < report[0].list.length; i++)
    {
        let {dt_txt} = report[0].list[i];
        let {temp , humidity} = report[0].list[i].main;
        let {description, icon} = report[0].list[i].weather[0];   
        let tmpF = normalizeTemp(temp);

            if(dt_txt.substring(11) === '15:00:00' ){
            
                let dayobj = {
                    "dt_text":dt_txt,
                    "temp":tmpF,
                    "humidity":humidity,
                    "description":description,
                    "icon": icon,
                }
                fiveDayFor.push(dayobj);
            }
    }
   
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
        speed: speed,
        fiveDayFor:fiveDayFor,
        value: value,
        uv: report[2] //uv index for five day forecast
    }

    return Wreport;
}


