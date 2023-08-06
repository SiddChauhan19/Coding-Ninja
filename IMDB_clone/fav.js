const movieDetailsContainer = document.getElementById('fav-list');
var favData = localStorage.getItem('favCont');
if (favData) {
    try {
        myFav = JSON.parse(favData);
        console.log(myFav);
    }
    catch (err) {
        console.log(err, "Error in parsing the data");
    }
}

//Functionality for remove
function removeMovieFromFavorites(imdbID) {
    // Find the index of the movie with the specified IMDb ID in myFav array
    const index = myFav.findIndex(movie => movie.imdbID === imdbID);
    if (index !== -1) {
        // Remove the movie from the array
        myFav.splice(index, 1);
        // Update local storage with the updated myFav array
        localStorage.setItem('favCont', JSON.stringify(myFav));
        // Re-display all favorite movies after the removal
        displayAllFavoriteMovies();
    }
}


function displayAllFavoriteMovies() {

    movieDetailsContainer.innerHTML = ""; // Clear the container before displaying movies
    if (myFav && myFav.length > 0) {
        try {
            myFav.forEach(movie => {
                const cardElements = document.createElement('div');
                const { Title, Poster, Year, imdbID, Type } = movie;
                const movieDetailsHTML = `
            <div class="movie-details">
                <h2>${Title}</h2>
                <img src="${Poster}" alt="${Title}">
                <p>Release Year: ${Year}</p>
                <p>IMDB ID: ${imdbID}</p>
                <p>Type: ${Type}</p>
                <button onclick="removeMovieFromFavorites('${imdbID}')">Remove from Favorites</button>

            </div>`
                cardElements.innerHTML = movieDetailsHTML;// Add the movie details HTML to the movie-details-container div in the new page
                movieDetailsContainer.appendChild(cardElements);
            });
        }
        catch (err) {
            console.log("error in parsing the data", err);
        }
    }

    else {
        movieDetailsContainer.innerHTML = "<p>No Movies Found</p>"
    }

}

// Display all favorite movies when the page loads
document.addEventListener('DOMContentLoaded', displayAllFavoriteMovies);
