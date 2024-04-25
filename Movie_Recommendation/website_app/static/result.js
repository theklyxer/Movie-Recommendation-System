document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "1880416f2f173ccb36230471dd46fed6";
    const apiUrlBase = "https://api.themoviedb.org/3/find/";
    const externalSource = "imdb_id";
    const posterBaseUrl = "https://image.tmdb.org/t/p/w300";

    // Get the container with movie IDs
    const idsContainer = document.querySelector('.titles-dump');

    // Check if there are IDs
    if (idsContainer.textContent.trim() === "") {
        const resultShower = document.querySelector('.TheResultShower');
        resultShower.innerHTML = `<div class="height50vh">
        <p class="category-heading-upgraded d-inline">No similar movies found</p> &nbsp
        <i class="fa fa-frown-o" aria-hidden="true"></i>
    </div>`;
        return; // Stop further execution if no IDs are found
    }

    // Split the IDs into an array
    const ids = idsContainer.textContent.trim().split(/\s+/);

    // Get the container for displaying movie results
    const resultShower = document.querySelector('.TheResultShower .movie-gallery');

    // Loop through each ID
    ids.forEach(id => {
        // Prepend "tt" to the ID
        const imdbId = "tt" + id;

        // Construct the API URL
        const apiUrl = `${apiUrlBase}${imdbId}?api_key=${apiKey}&external_source=${externalSource}`;

        // Fetch movie data from the API
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const movieResults = data.movie_results;
                if (movieResults.length > 0) {
                    const movie = movieResults[0];
                    const title = movie.title;
                    const posterPath = movie.poster_path;
                    const posterUrl = `${posterBaseUrl}${posterPath}`;
                    const imdbLink = `https://www.imdb.com/title/${imdbId}/`; // Use IMDb ID instead of title
                    const rating = parseFloat(movie.vote_average).toFixed(1);

                    // Create the movie container
                    const movieContainer = document.createElement('a'); // Change to anchor tag
                    movieContainer.href = imdbLink; // Set href to IMDb link
                    movieContainer.classList.add('each-movie', 'imdbResults');

                    // Populate the movie container with HTML
                    movieContainer.innerHTML = `
                        <div class="image-container">
                            <img class="small-posters" src="${posterUrl}" alt="${title}">
                        </div>
                        <div class="movie-info">
                            <div class="d-flex align-items-center">
                                <div>
                                    <p class="movie-title-small d-inline">${title}</p>
                                </div>
                                <a class="go-to-movie-button" href="${imdbLink}"><button>></button></a>
                            </div>
                            <p class="movie-rating">${rating}</p>
                        </div>
                    `;

                    // Append the movie container to the result shower
                    resultShower.appendChild(movieContainer);
                } else {
                    console.error('No movie found for IMDb ID:', imdbId);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    });
});
