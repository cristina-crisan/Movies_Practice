const baseUrl = "https://movies-api-siit.herokuapp.com"
class HttpService {
  constructor() { };

  static regenerateMovies() {
    return fetch(`${baseUrl}/movies/all`, {
      method: "POST"
    });
  };

  static getMovies() {
    return fetch(`${baseUrl}/movies/?skip=0&take=10`).then(response => response.json());
  };

  static getAllMovies(skip = null) {
    return fetch(`${baseUrl}/movies/?skip=${skip}&take=10`)
      .then(response => {
        return response.json();
      });
  }

  static searchMovie(title) {
    return fetch(`${baseUrl}/movies/?Title=${title}`)
      .then(response => {
        return response.json();
      });
  }

  static getMovieDetails(movieId) {
    return fetch(`${baseUrl}/movies/${movieId}`).then(response => response.json());
  }

  static register(username, password) {
    let data = {
      username: username,
      password: password
    };
    return fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
  }

  static loginUser(username, password) {
    let data = {
      username: username,
      password: password
    };

    return fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
  }

  static logoutUser() {
    return fetch(`${baseUrl}/auth/logout`, {
      method: "GET",
      headers: {
        "x-Auth-Token": localStorage.getItem("accessToken")
      }
    }).then(response => response.json())
  }

  static delete(movieId) {
    return fetch(`${baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-Auth-Token": localStorage.getItem("accessToken")
      }
    }).then(function (response) {
      return response.text();
    });
  }

  static update(movieId, data) {
    return fetch(`${baseUrl}/movies/${movieId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        "x-Auth-Token": localStorage.getItem("accessToken")
      }
    }).then(function (response) {
      return response.json();
    });
  }

  static add(data) {
    return fetch(`${baseUrl}/movies`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        "x-Auth-Token": localStorage.getItem("accessToken")
      }
    }).then(response => {
      return response.json();
    });
  }

}
