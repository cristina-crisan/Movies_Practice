function login() {
  let username = document.querySelector(".user").value;
  let password = document.querySelector(".password").value;

  if (username && password) {
    HttpService.loginUser(username, password).then(response => {
      console.log(response);
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("user", username);
    })
  }
}