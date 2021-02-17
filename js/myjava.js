let query
let saved = JSON.parse(localStorage.getItem('savedCities'));

clearAll = () => {
    $('#city').text('Search a city for weather info');
    $('#date').text('');
    $('#temp').text('Temperature: ');
    $('#hum').text('Humidity: ');
    $('#wind').text('Wind: ');
    $('#uv').text('UV Index: ');
    $('#uvi').text('');
    $('#uvi').attr('class','');
    $('#icon').attr('src','');
}
loadSaved = () => {
    $('#cityList').empty();
    console.log(saved);
    if (saved){
        for (i=0;i<saved.length;i++){
            var div = $('<li>');
            div
                .attr('class','card d-flex flex-row-reverse city')
                .text(saved[i])
                ;            
            $('#cityList').append(div);
        };
    };
    $('.city').on('click',function(){
        query = $(this).text();
        getCoords(query);
    });
};
// convert Kelvin to Fahrenheit
convertKelvin = (k) => {
    var c = parseInt(k)-273.15;
    var f = Math.round((9*c/5)+32);
    return f     
}


clearAll();
// everything happens on page load
$(window).on('load',function(){
    loadSaved();
    if(saved){
        getCoords(saved[0]);
    }else{
        saved = [];
    };
    // clicking the search button
    $('#searchBtn').on('click', function(event){
        event.preventDefault();
        query = $('#searchBox').val();
        if(query){
            getCoords(query);
            saved.unshift(query);
            localStorage.setItem('savedCities', JSON.stringify(saved));
        };
        loadSaved();
    });

});

// API call to search input query and find coordinates
function getCoords(query){
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/http://api.positionstack.com/v1/forward',
        data: {
          access_key: '1665e6e9379ebb7b035db50a9c23beec',
          query: query,
          limit: 1
        }
    }).then(function(response) {
        console.log(response.data);
        
        const lat = response.data[0].latitude;
        const lon = response.data[0].longitude;
        // insert coordinates into API call for weather
        const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=4fee5100753d9c5843938d03bf31bfce';
        $.get(weatherURL).then(function(data){
            console.log(data);
            clearAll();
            // get current weather and push to page
            const current = data.current
            $('#city').text(response.data[0].label);
            $('#date').text(`(${dayjs.unix(current.dt).format('M/D/YY')})`);
            $('#icon').attr('src','http://openweathermap.org/img/wn/'+current.weather[0].icon+'@2x.png');
            $('#temp').text(`Temperature: ${current.temp}°F`);
            $('#hum').text(`Humidity: ${current.humidity}%`);
            $('#wind').text(`Wind: ${current.wind_deg}°, ${current.wind_speed} MPH`);
            // check UV index, add a class based on range
            const uvi = parseInt(current.uvi);
            const uv = $('#uvi');
            uv.text(uvi);
            if(uvi < 3){
                uv.addClass('low');
            }else if(uvi >= 3 && uvi < 6){
                uv.addClass('mod');
            }else if(uvi >= 6 && uvi < 8){
                uv.addClass('high');
            }else if(uvi >= 8 && uvi < 10){
                uv.addClass('vhigh');
            }else if(uvi >= 10){
                uv.addClass('extr');
            };        
            // fetch and push 5 day forecast
            for(i=0;i<5;i++){
                const daily = data.daily[i];
                $('#day'+i).text(dayjs.unix(daily.dt).format('ddd, MMM D'));
                $('#hi'+i).text(`H: ${Math.round(daily.temp.max)}°F`);
                $('#low'+i).text(`L: ${Math.round(daily.temp.min)}°F`);
                $('#hum'+i).text(`Humidity: ${daily.humidity}%`);
                $('#con'+i).text(daily.weather[0].description);
                $('#icon'+i).attr('src','http://openweathermap.org/img/wn/'+daily.weather[0].icon+'@2x.png');
            };
        });
    });
    
};

