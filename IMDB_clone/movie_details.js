// movie_details.js

// Function to fetch movie details using IMDb ID
function fetchMovieDetails() {
    const imdbID = JSON.parse(localStorage.getItem('selectedMovieIMDbID'));
    console.log("imdbID1:", imdbID);
    // const searchItems = localStorage.getItem('searchItems');    
    if (!imdbID) {
        console.error('IMDb ID or searchItems not found in localStorage.');
        return;
    }
    displayMovieDetails(imdbID);
}

// Function to display the movie details on a new page
function displayMovieDetails(movieDetails) {
    console.log(movieDetails);
    const { Title, Poster, Year, imdbID, Type } = movieDetails;
    const movieDetailsHTML = `
        <div class="movie-details">
            <h2>${Title}</h2>
            <img src="${Poster}" alt="${Title}">
            <p>Release Year: ${Year}</p>
            <p>IMDB ID: ${imdbID}</p>
            <p>Type: ${Type}</p>
        </div>
    `;

    // Add the movie details HTML to the movie-details-container div in the new page
    const movieDetailsContainer = document.getElementById('movie-details-container');
    movieDetailsContainer.innerHTML = movieDetailsHTML;
}

// Call the fetchMovieDetails function when the page loads
document.addEventListener('DOMContentLoaded', fetchMovieDetails);

