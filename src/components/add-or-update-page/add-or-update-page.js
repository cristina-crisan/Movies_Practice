window.onload = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let movieId = urlParams.get('id');
  console.log(movieId);
  HttpService.getMovieDetails(movieId).then(response => {
    console.log(response)
    populateInputs(response);
  })
}

function back(){
  let urlParams = new URLSearchParams(window.location.search);
  let movieId = urlParams.get('id');
  location.assign("../movie-details/movie-details.html?id=" + movieId);
}

function getInputs() {
  let title = document.querySelector(".title");
  let year = document.querySelector(".year");
  let language = document.querySelector(".language");
  let runtime = document.querySelector(".runtime");
  let genre = document.querySelector(".genre");
  let imdbRating = document.querySelector(".rating");
  let imgUrl = document.querySelector("[type=url]")
  let description = document.querySelector(".description")

  let inputs = {
    Title: title,
    Plot:description,
    Year: year,
    Language:language,
    Runtime: runtime,
    Genre:genre,
    imdbRating:imdbRating,
    Poster:imgUrl
  }
  return inputs;
}

function populateInputs(movieData){
  let movieInputs = getInputs();
  console.log("inputs",movieInputs);
  movieInputs.Title.value = movieData.Title;
  movieInputs.Plot.value = movieData.Plot;
  movieInputs.Year.value = movieData.Year;
  movieInputs.Language.value = movieData.Language;
  movieInputs.Runtime.value = movieData.Runtime;
  movieInputs.Genre.value = movieData.Genre;
  movieInputs.imdbRating.value = movieData.imdbRating;
  movieInputs.Poster.value = movieData.Poster;

  let imageMovie = document.querySelector(".image-movie img");
  imageMovie.src = movieData.Poster;
}

function changeImage(){
  let newUrl = document.querySelector("[type=url]").value
  let imageMovie = document.querySelector(".image-movie img");
  imageMovie.src = newUrl;
}
function save(){
  let urlParams = new URLSearchParams(window.location.search);
  let movieId = urlParams.get('id');
  updateMovie(movieId);
}

function movieData(){
  let movieInputNodes = getInputs();
  return {
    Title:movieInputNodes.Title.value,
    Plot:movieInputNodes.Plot.value,
    Year:  movieInputNodes.Year.value,
    Language:movieInputNodes.Language.value,
    Runtime: movieInputNodes.Runtime.value,
    Genre:movieInputNodes.Genre.value,
    imdbRating:movieInputNodes.imdbRating.value,
    Poster:movieInputNodes.Poster.value,

  }
}

async function updateMovie(movieId){
  let data = movieData();
  console.log("data", data);
  await HttpService.update(movieId,data);
  console.log("afterData",data)
  location.assign("../movie-details/movie-details.html?id=" + movieId);
}


