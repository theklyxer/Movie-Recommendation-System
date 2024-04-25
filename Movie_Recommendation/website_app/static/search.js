document.addEventListener("DOMContentLoaded", function() {
    var prevBtn = document.querySelector('.prev-btn');
    var nextBtn = document.querySelector('.next-btn');
    var ulLeft = document.querySelector('.carousel .ul-left');
    var ulRight = document.querySelector('.carousel .ul-right');

    // Set interval for changing carousel items
    var intervalId = setInterval(changeCarouselItem, 5000); // Change every 5 seconds

    function changeCarouselItem() {
        var activeLeftItem = document.querySelector('.carousel .ul-left .active');
        var activeRightItem = document.querySelector('.carousel .ul-right .active');

        // Check if there's a next sibling, if not, loop back to the first item
        var nextLeftItem = activeLeftItem.nextElementSibling ? activeLeftItem.nextElementSibling : ulLeft.firstElementChild;
        var nextRightItem = activeRightItem.nextElementSibling ? activeRightItem.nextElementSibling : ulRight.firstElementChild;

        // Remove 'active' class from current items
        activeLeftItem.classList.remove('active');
        activeRightItem.classList.remove('active');

        // Add 'active' class to next items
        nextLeftItem.classList.add('active');
        nextRightItem.classList.add('active');
    }

    // Event listeners for previous and next buttons
    prevBtn.addEventListener('click', function() {
        clearInterval(intervalId); // Stop the interval timer
        changeCarouselItem(); // Change to previous item
        intervalId = setInterval(changeCarouselItem, 5000); // Start the interval timer again
    });

    nextBtn.addEventListener('click', function() {
        clearInterval(intervalId); // Stop the interval timer
        changeCarouselItem(); // Change to next item
        intervalId = setInterval(changeCarouselItem, 5000); // Start the interval timer again
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var movies = document.querySelectorAll('.each-movie');

    movies.forEach(function(movie) {
        var image = movie.querySelector('.small-posters');
        var info = movie.querySelector('.movie-info');

        image.addEventListener('load', function() {
            var imageHeight = image.offsetHeight;
            info.style.height = imageHeight + 'px';
        });
    });
});

//document.addEventListener("DOMContentLoaded", function () {
//        var searchForm = document.getElementById('searchForm');
//        var searchInput = document.getElementById('searchInput');
//
//        searchForm.addEventListener('submit', function (event) {
//            // Convert the input value to lowercase before submitting
//            searchInput.value = searchInput.value.toLowerCase().trim();
//        });
//    });
//
//const searchInput = document.getElementById('searchInput');
//const suggestionsDiv = document.getElementById('suggestions');
//
//searchInput.addEventListener('input', function(event) {
//    const searchTerm = event.target.value.trim(); // Get trimmed search term
//    if (searchTerm.length >= 2) { // Only search if the search term is at least 2 characters
//        fetchSuggestions(searchTerm);
//    } else {
//        suggestionsDiv.innerHTML = ''; // Clear suggestions if the search term is too short
//    }
//});

document.getElementById('searchInput').addEventListener('input', function() {
    var input = this.value;
    if (input.trim() !== '') { // Check if input is not empty or whitespace
        fetchSuggestions(input);
    } else {
        document.getElementById('suggestions').style.display = 'none'; // Hide suggestions when input is empty
    }
});

function fetchSuggestions(input) {
    fetch('/website/search?suggestion=' + input)
        .then(response => response.json())
        .then(data => {
            if (data.suggestions.length > 0) {
                displaySuggestions(data.suggestions);
            } else {
                document.getElementById('suggestions').style.display = 'none'; // Hide suggestions if no suggestions are returned
            }
        });
}

function displaySuggestions(suggestions) {
    var suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';
    var ul = document.createElement('ul');
    suggestions.forEach(function(suggestion) {
        var li = document.createElement('li');
        var anchor = document.createElement('a');  // Create anchor tag for each suggestion
        anchor.textContent = suggestion;
        anchor.href = "#";  // Set href to "#" for JavaScript behavior
        anchor.addEventListener('click', function(event) {
            event.preventDefault();  // Prevent default link behavior
            document.getElementById('searchInput').value = suggestion;  // Fill suggestion in search input
            document.getElementById('searchForm').submit();  // Submit the form
        });
        li.appendChild(anchor);
        ul.appendChild(li);
    });
    suggestionsDiv.appendChild(ul);
    suggestionsDiv.style.display = 'block'; // Display suggestions
}



// Assuming suggestions are fetched and stored in a variable named 'suggestions'
//
//const suggestionsDiv = document.getElementById('suggestions');
//
//// Position suggestions above the search bar
//const searchInput = document.getElementById('searchInput');
//const searchFormContainer = document.querySelector('.search-form-container');
//
//suggestionsDiv.innerHTML = ''; // Clear previous suggestions
//if (suggestions.length > 0) {
//    suggestionsDiv.innerHTML = ''; // Clear previous suggestions
//    suggestions.forEach(suggestion => {
//        const suggestionElement = document.createElement('div');
//        suggestionElement.classList.add('suggestion');
//        suggestionElement.textContent = suggestion;
//        suggestionsDiv.appendChild(suggestionElement);
//    });
//
//    // Position suggestions above the search bar
//    const searchBarRect = searchFormContainer.getBoundingClientRect();
//    suggestionsDiv.style.top = `${searchBarRect.top - suggestionsDiv.offsetHeight}px`;
//    suggestionsDiv.style.left = `${searchBarRect.left}px`;
//    suggestionsDiv.style.display = 'block';
//} else {
//    suggestionsDiv.style.display = 'none';
//}

document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "1880416f2f173ccb36230471dd46fed6";
    const apiUrlBase = "https://api.themoviedb.org/3/find/";
    const externalSource = "imdb_id";
    const posterBaseUrl = "https://image.tmdb.org/t/p/w300";

    // Get the container with movie IDs
    const idsContainer = document.querySelector('.mystery-titles-dump');

    // Get the container for displaying movie results
    const resultShower = document.querySelector('.TheSearchShower .mystery-gallery');

    // Check if there are IDs
    if (idsContainer.textContent.trim() === "") {
        resultShower.innerHTML = `
            <div class="height50vh">
                <p class="category-heading-upgraded d-inline">No similar movies found</p> &nbsp
                <i class="fa fa-frown-o" aria-hidden="true"></i>
            </div>`;
        return; // Stop further execution if no IDs are found
    }

    // Split the IDs into an array
    const ids = idsContainer.textContent.trim().split(/\s+/);

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
