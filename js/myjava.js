let cities = ['concord','albany','sacramento']
let query
// localStorage.setItem('savedCities',JSON.stringify(cities));
let saved = JSON.parse(localStorage.getItem('savedCities'));

clearAll = () => {
    $('#city').text('');
    $('#date').text('');
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
        console.log(query);
        getCoords(query);
    });
};
convert = (k) => {
    var c = parseInt(k)-273.15;
    var f = Math.round((9*c/5)+32);
    return f     
}

clearAll();
// everything happens on page load
$(window).on('load',function(){
    loadSaved();
    getCoords(saved[0]);
    // clicking the search button
    $('#searchBtn').on('click', function(event){
        event.preventDefault();
        query = $('#searchBox').val();
        console.log(query);
        if(query){
            getCoords(query);
            console.log(saved)
            saved.unshift(query);
            localStorage.setItem('savedCities', JSON.stringify(saved));
        };
        loadSaved();
    });

});


function getCoords(query){
    $.ajax({
        url: 'http://api.positionstack.com/v1/forward',
        data: {
          access_key: '1665e6e9379ebb7b035db50a9c23beec',
          query: query,
          limit: 1
        }
      }).then(function(response) {
        console.log(response.data);
        $('#city').text(response.data[0].label);
        const lat = response.data[0].latitude;
        const lon = response.data[0].longitude;
        const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=4fee5100753d9c5843938d03bf31bfce'
        $.get(weatherURL).then(function(data){
            console.log(data);
        day0 = dayjs.unix(data.daily[0].dt).format('M/D/YY');
        $('#date').text(`(${day0})`);
        // fetch and push 5 day forecast
        for(i=0;i<5;i++){
            const daily = data.daily[i];
            $('#day'+i).text(dayjs.unix(daily.dt).format('ddd, MMM D'));
            $('#hi'+i).text(`H: ${convert(daily.temp.max)}°F`);
            $('#low'+i).text(`L: ${convert(daily.temp.min)}°F`);
            $('#con'+i).text(daily.weather[0].description);
            $('#icon'+i).attr('src','http://openweathermap.org/img/wn/'+daily.weather[0].icon+'@2x.png');
        }
        });
    });
    
};

