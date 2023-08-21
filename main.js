function fetchWeather(city, infoCard) {
    const apiKey = '2a2b801f81636086af712b4a9bef16a7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "json",
        success: function (data) {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;

            infoCard.html(`
                <p>Destination: ${city}</p>
                <p>Weather: ${weatherDescription}</p>
                <p>Temperature: ${temperature}°C</p>
            `);
            infoCard.show(); // This is to show the info card when hovering
        },
        error: function () {
            alert(`Failed to fetch weather data for ${city}.`);
        }
    });
}

$('.info-button').on('click', function () {
    const cruiseCard = $(this).closest('.cruise-card');
    const city = cruiseCard.find('h2').text(); // H2 tag finds the name of the place
    const infoCard = cruiseCard.find('.info-card');
    fetchWeather(city, infoCard);
});

function filterAndSortCruiseCards() {
    const priceFilter = $('#price-filter').val();
    const destinationFilter = $('#destination-filter').val();

    const cruiseCards = $('.cruise-card');
    cruiseCards.sort(function (a, b) {
        const priceA = parseFloat($(a).find('p:contains("Price:")').text().replace(/[^\d.]/g, ''));
        const priceB = parseFloat($(b).find('p:contains("Price:")').text().replace(/[^\d.]/g, ''));
        return priceFilter === 'low-to-high' ? priceA - priceB : priceB - priceA;
    });

    // This filters the cruises by destination
    cruiseCards.each(function () {
        const destination = $(this).find('h2').text();
        if (destinationFilter === 'all' || destination === destinationFilter) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}
// Filters the destination or price, price doesnt work, still need to figure that out
$('#price-filter, #destination-filter').on('change', filterAndSortCruiseCards);