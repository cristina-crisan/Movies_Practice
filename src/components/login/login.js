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
  showLogOut()
}

function showLogOut(){
  if (localStorage.getItem("accessToken")){
    document.querySelector(".login").style.display = "none";
    document.querySelector(".logout").style.display = "inline-block";
  }
}
