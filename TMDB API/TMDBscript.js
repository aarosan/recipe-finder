var APIKey = 'b308edb38dbc4c10566851b90f4974bb';
var genres = 53;

function getAPI() {
    var tvQuery = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_original_language=en&page=1&sort_by=popularity.desc&with_genres=53%&api_key=" + APIKey;
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
