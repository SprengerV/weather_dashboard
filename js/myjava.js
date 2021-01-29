let cities = ['concord','albany','sacramento']
let query
localStorage.setItem('savedCities',JSON.stringify(cities));
const saved = JSON.parse(localStorage.getItem('savedCities'));



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
};

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
            saved.unset(query);
            localStorage.setItem('savedCities', JSON.stringify(saved));
        };
        loadSaved();
        getCoords(saved[0]);
    });
    $('.city').on('click',function(){
        query = $(this).text();
        console.log(query);
        getCoords(query);
    })
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
        const lat = response.data[0].latitude;
        const lon = response.data[0].longitude;
        const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=4fee5100753d9c5843938d03bf31bfce'
        $.get(weatherURL).then(function(data){
            console.log(data);
        })
    });
    
};

function displayCity(){
    const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=4fee5100753d9c5843938d03bf31bfce'
    $.get(weatherURL).then(function(data){
        console.log(data);
    })
};