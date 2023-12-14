var APIKey = 'b308edb38dbc4c10566851b90f4974bb';
var genres = 53;

function getAPI() {

    // Add movie genres to tvQuery parameters

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

    genresString = genres[0];

    if (genres.length > 1) {
        for (i=1; i<genres.length; i++) {
            genresString += ("%2C" + genres[i]);
        }
    }

    console.log(genresString);   


    var tvQuery = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_original_language=en&page=1&sort_by=popularity.desc&with_genres=" + genresString + "&api_key=" + APIKey;
    fetch(tvQuery)
        .then(function (response) {
            return response.json()
        }).then ( function(data) {
            // Pick a movie by random from data array
            var movieChoice = Math.floor(Math.random()*data.results.length);
            var movieTitle = data.results[movieChoice].original_title;
            var movieRating = data.results[movieChoice].vote_average;
            var moviePoster = data.results[movieChoice].poster_path;
            var movieDescription = data.results[movieChoice].overview;

            //render elements to section
            $('#movie-poster-render').attr('src',"https://image.tmdb.org/t/p/w185"+moviePoster);
            $('#movie-render-title').text(movieTitle);
            $('#movie-render-rating').text("User Rating: " + movieRating);
            $('#movie-render-description').text(movieDescription);
        });
};



$('#search-button').on('click', getAPI);
