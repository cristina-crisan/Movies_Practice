

function register() {
  let username = document.querySelector(".user").value;
  let password = document.querySelector(".password").value;

  HttpService.register(username, password).then(response => console.log(response))
}



