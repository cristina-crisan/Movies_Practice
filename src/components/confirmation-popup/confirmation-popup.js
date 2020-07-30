function createPopUpTemplate(){
  return `  <div class="pop-up--wrapper">
  <div class="pop-up-content">
  <header class="pop-up--header">
    <h3>Delete Movie</h3>
    <button onclick="closePopUp()" class="close"><i class="fas fa-times"></i></button>
  </header>
  <div class="pop-up--message">
    <p>Are you sure you want to delete this movie?</p>
  </div>
  <footer class="pop-up--footer">
    <button type="button" class="delete" onclick="deleteMovie()">Delete</button>
    <button type="button" onclick="closePopUp()" class="cancel">Cancel</button>
  </footer>
  </div>
</div> `
}

function openPopUp(){
  let popUpTemplate = createPopUpTemplate();
  document.querySelector(".pop-up").innerHTML = popUpTemplate;
}

function closePopUp(){
  document.querySelector(".pop-up--wrapper").style.display="none";
}

function deleteMovie(){
  let urlParams = new URLSearchParams(window.location.search);
  let movieId = urlParams.get('id');
  console.log(movieId);
  HttpService.delete(movieId).then(()=>window.location.href = "../../../index.html");
}

