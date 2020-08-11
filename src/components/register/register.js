function register() {
  let username = document.querySelector(".user").value;
  let userElement = document.querySelector(".user");
  let password = document.querySelector(".password").value;
  let passwordElement = document.querySelector(".password");

  if ((username.length < 8) || (password.length < 8)) {
    userElement.style.borderBottomColor = "red";
    userElement.value = "Username must have at least 8 characters.";
    passwordElement.type = "text";
    passwordElement.style.borderBottomColor = "red";
    passwordElement.value = "Password must have at least 8 characters.";
  }
  if (username.length >= 8 && password.length >= 8) {
    HttpService.register(username, password).then(response => {
      console.log(response)
    if (response.authenticated) {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", username);
      goToLogin()
    }
  });
  }
}

function goToLogin(){
  location.assign("../login/login-page.html")
}

