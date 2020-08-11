
window.onload = () => {
  HttpService.getMovies(0).then(response => {
    console.log(response);
    createPagination(response.pagination);
    loadMovies(response.results);
    checkIfLoggedIn()
  });
}

function regenerate() {
  HttpService.regenerateMovies().then(function () {
    location.reload();
  })
}

function createMovieTemplate(movie) {
  return `
  <div class="movie" style="background-image: url(${movie.Poster != 'N/A' ? movie.Poster : 'src/images/Batman-hover.jpg'} )" id =${movie._id}  onclick = "openMovieDetails('${movie._id}')" >
  <p class="movie-title">${movie.Title}</p>
</div> `
}

function searchMessage() {
  let title = document.querySelector(".title").value;
  let movieWrapper = document.querySelector(".section--wrapper");
  movieWrapper.innerHTML = `<div>
  <p>Your search for <span>"${title}"</span> didn't return any results</p>
  <p>Suggestions:</p>
  <ul>
  <li>Make sure all words are spelled correctly</li>
  <li>Try different keywords</li>
  <li>Try entering more general keywords</li>
  <li>Try entering fewer keywords</li>
  </ul>
  </div>`
}

function loadMovies(movies) {
  if (!movies.length) {
    searchMessage();
    return;
  }
  let allMoviesTemplate = "";
  let movieWrapper = document.querySelector(".section--wrapper");
  movies.forEach(movie => {
    let movieTemplate = createMovieTemplate(movie);
    allMoviesTemplate += movieTemplate;
  })
  movieWrapper.innerHTML = allMoviesTemplate;
}

function showPage(pageNumber) {
  let skip = pageNumber * 10 - 10;
  let pagination = document.querySelector(".pagination");
  let paginationList = pagination.querySelectorAll("button");
  HttpService.getAllMovies(skip).then(function (movies) {
    paginationList.forEach(page => {
      page.classList.remove("active");
      if (page.innerText == movies.pagination.currentPage) {
        page.classList.add("active");
      }
    });
    loadMovies(movies.results);
  });
}

function createPagination(movies) {
  let paginationList = document.querySelector(".pagination");
  paginationList.innerHTML = "";
  let arrayOfMovies = [];
  for (let i = 1; i <= movies.numberOfPages; i++) {
    let paginationTemplate;
    if (i == 1) {
      paginationTemplate = `<button class="active" onclick="showPage('${i}')">${i}</button>`;
    } else {
      paginationTemplate = `<button onclick="showPage('${i}')">${i}</button>`;
    }
    arrayOfMovies.push(paginationTemplate);
  }
  let string = arrayOfMovies.join("");
  paginationList.innerHTML = string;
}

function movieDetails() {
  location.assign("src/components/movie-details/movie-details.html");
}

function search() {
  let title = document.querySelector(".title").value;
  console.log(title);
  HttpService.searchMovie(title).then(function (movies) {
    createPagination(movies.pagination);
    loadMovies(movies.results);
  })
}

function homePage() {
  location.reload();
}

function loginPage() {
  location.assign("src/components/login/login-page.html")
}

function addMovie() {
  window.location.href = "src/components/add-or-update-page/add-or-update-page.html?id=0";
}

function openMovieDetails(movieId) {
  window.location.href = `src/components/movie-details/movie-details.html?id=${movieId}`;
}

function checkIfLoggedIn() {
  if (localStorage.getItem("accessToken")) {
    document.querySelector(".login").style.display = "none";
    document.querySelector(".logout").style.display = "block";
    document.querySelector(".add-movie").style.display = "block";
    let username = document.querySelector(".user-name span");
    username.innerText = localStorage.getItem("user");
  }
}

function logout() {
  document.querySelector(".logout").style.display = "none";
  document.querySelector(".user-name").style.display = "none";
  document.querySelector(".add-movie").style.display = "none";
  document.querySelector(".login").style.display = "block";
  HttpService.logoutUser().then(response => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  })
}