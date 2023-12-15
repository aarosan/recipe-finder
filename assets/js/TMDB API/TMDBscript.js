// Initializing the API key that will get referenced throughout (Eric Peterson's API key established on 12/12/23)
var APIKey = 'b308edb38dbc4c10566851b90f4974bb';
var genres = 53;

// When 'Generate' button is selected in the film section, start the entire getAPI function
function getAPI() {

    // Initialize a blank array that'll be converted to a string, this holds the TMDB genre codes that'll be passed into the API call below

    genres = [];
    genresString = "";

    if ($('#action').is(":checked")) {
        genres.push('28')
    } if ($('#adventure').is(":checked")) {
        genres.push('12')
    } if ($('#animation').is(":checked")) {
        genres.push('16')
    } if ($('#comedy').is(":checked")) {
        genres.push('35')
    } if ($('#crime').is(":checked")) {
        genres.push('80')
    } if ($('#documentary').is(":checked")) {
        genres.push('99')
    } if ($('#drama').is(":checked")) {
        genres.push('18')
    } if ($('#fantasy').is(":checked")) {
        genres.push('14')
    } if ($('#horror').is(":checked")) {
        genres.push('27')
    } if ($('#mystery').is(":checked")) {
        genres.push('9648')
    } if ($('#romance').is(":checked")) {
        genres.push('10749')
    } if ($('#science-fiction').is(":checked")) {
        genres.push('878')
    } if ($('#thriller').is(":checked")) {
        genres.push('53')
    };

    // First component of the genresString needs to be the first genre selected, since there's a minimum requirement of one selection. Any additional genre codes will be preceded with a "%2C" string
    genresString = genres[0];

    // Add additional genre codes in the array to the genresString
    if (genres.length > 1) {
        for (i=1; i<genres.length; i++) {
            genresString += ("%2C" + genres[i]);
        }
    }
    
    // Main TMDB query that takes the above-created genre string, passes it into the API call along with the API Key
    var tvQuery = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_original_language=en&page=1&sort_by=popularity.desc&with_genres=" + genresString + "&api_key=" + APIKey;
    fetch(tvQuery)
        .then(function (response) {
            return response.json()
        }).then ( function(data) {
            // Pick a movie by random from returned data array
            var movieChoice = Math.floor(Math.random()*data.results.length);
            var movieTitle = data.results[movieChoice].original_title;
            var movieRating = data.results[movieChoice].vote_average;
            var moviePoster = data.results[movieChoice].poster_path;
            var movieDescription = data.results[movieChoice].overview;

            // render all four elements to display section
            $('#movie-poster-render').attr('src',"https://image.tmdb.org/t/p/w185"+moviePoster);
            $('#movie-render-title').text(movieTitle);
            $('#movie-render-rating').text("User Rating: " + movieRating);
            $('#movie-render-description').text(movieDescription);
        });
};

// Add event listener to 'generate button
$('#search-button').on('click', getAPI);
