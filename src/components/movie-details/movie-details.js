window.onload = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let gameId = urlParams.get('id');
  console.log(gameId);
  HttpService.getMovieDetails(gameId).then(response => {
    console.log(response);
    loadMovie(response);
  })
}

function loadMovie(movie) {
  let parent = document.querySelector(".movie-template");
  let movieTemplate = createMovieTemplate(movie);
  parent.innerHTML = movieTemplate;
}

function createMovieTemplate(movie) {
  return `
<div class="movie-title">
<div class="decoration--line"></div>
<h2>${movie.Title}</h2>
<div class="decoration--line"></div>
</div>
<div class="movie">
<div class="movie-image">
  <img src=${movie.Poster} alt="Movie image">
</div>
<div class="movie-content">
  <div class="movie-description">
    <span>/</span>
    <span>Description</span>
    <div class="decoration--line"></div>
    <p>${movie.Plot}</p>
  </div>
  <div class="movie-details">
    <span>/</span>
    <span>Details</span>
    <div class="decoration--line"></div>
    <p>Actors: ${movie.Actors}</p>
    <p>Year: ${movie.Year}</p>
    <p>Language: ${movie.Language}</p>
    <p>Runtime: ${movie.Runtime}</p>
    <p>Genre: ${movie.Genre}</p>
  </div>
  <div class="movie-actions">
    <button type="button" class="edit-button">Edit</button>
    <button type="button" class="delete-button">Delete</button>
  </div>
</div>
</div>
`
}

function back(){
  location.assign("../../../index.html");
}