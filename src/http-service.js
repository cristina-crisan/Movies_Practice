const baseUrl = "https://movies-api-siit.herokuapp.com/movies?skip=0&take=10";
const url = "https://movies-api-siit.herokuapp.com"
class HttpService {
  constructor () {};

  static regenerateMovies() {
    return fetch(`${url}/movies/all`, {
      method: "POST"
    });
  };

  static getMovies() {
    return fetch(baseUrl).then(response => response.json());
  };

  static getAllMovies(skip = null) {
    return fetch("https://movies-api-siit.herokuapp.com" + "/movies" + "?skip" + "=" + skip + "&take=10")
      .then(response => {
        return response.json();
      });
  }

  static searchMovie(title) {
    return fetch("https://movies-api-siit.herokuapp.com" + "/movies" + "?Title" + "=" + title)
      .then(response => {
        return response.json();
      });
  }

  static register(username, password) {
    let data = {
      username: username,
      password: password
    };

    return fetch(url + "/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json())
  }

};


