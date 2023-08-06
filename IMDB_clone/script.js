var showmovie = document.getElementById('show-movie');
// var showCardContainer = document.getElementById('show-card-container');
var showcard = document.getElementById('show-card');//for each cards

var favlist = document.getElementById('fav-list');

var myFav = [];
var favData = localStorage.getItem('favCont');
if (favData) {
    try {
        myFav = JSON.parse(favData);
    }
    catch (err) {
        console.log(err, "Error in parsing the data");
    }
}

//this will fetch movies from API and display it 
showmovie.addEventListener('input', function () {
    var searchItems = showmovie.value;
    console.log("currentValue:" + searchItems);

    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=2b13f321&s=${searchItems}`)
        .then(response => response.json())
        .then(data => movieCards(data.Search));
})

// use remove fav in fav.js 
// function addToFav(movie){
//     console.log("addToFav function");
//     if ( !myFav.some(selectedMovie => selectedMovie.imdbID == movie.imdbID)) {
//         myFav.push(movie);
//         updateAddFav();}
// }

// function updateAddFav() {
//     localStorage.setItem('favCont', JSON.stringify(myFav));
// }

//for Displaying the movies by using Dynamic div& and creating HTML inside
function movieCards(movies) {
    showcard.innerHTML = '';//empty the card
    console.log(movies);
    if (!movies) {
        showcard.innerHTML = '<h1>No Movies Found</h1>';
        return;
    }
    movies.forEach(movie => {
        const cardElements = document.createElement('div');
        cardElements.innerHTML = `
        <div class="card">
            <h2>${movie.Title}</h2>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>Movie Relese Year:${movie.Year}</h3>
            <button type="button" class="btn btn-outline-info add-fav">Add to Favourite</button>
            <button data-imdbID="${movie.imdbID}" type="button" class="btn btn-outline-info movie-btn">More Info</button>
            </div>`;
        showcard.appendChild(cardElements);

        // Attach event listeners to the movie buttons
        const movieButtons = cardElements.querySelector('.movie-btn');
        movieButtons.addEventListener('click', function (event) {
            // const imdbID = movie;
            //console.log("mk inside the more-info0");
            localStorage.setItem('selectedMovieIMDbID', JSON.stringify(movie)); // Store the IMDb ID in localStorage
            // const searchItems = showmovie.value;
            // localStorage.setItem('searchItems', showmovie.value); // Store the searchItems in localStorage
            console.log(movie);
            console.log("localStorage.getItem" + localStorage.getItem('selectedMovieIMDbID'));
            window.location.href = 'movie_details.html'; // Redirect to movie_details.html
        });

        //Add movies to favourite via localStroage
        const addFav = cardElements.querySelector('.add-fav');

        addFav.addEventListener('click', function (event) {
            if (!myFav.some(favmovie => favmovie.imdbID === movie.imdbID)) {
                myFav.push(movie);
                localStorage.setItem("favCont", JSON.stringify(myFav));
            }
            alert("Movie Added to favourites");
            // window.location.href = 'fav.html';

        })
    });

}
