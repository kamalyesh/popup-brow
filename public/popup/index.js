

function closePopup() {
  window.parent.log(document.getElementById("popup-input").value)
  window.close();
}


function bind() {
  document.getElementById("close-popup").addEventListener('click', closePopup)
  document.title = "Ready!"
  window.name = "Popup"
}

window.addEventListener("load", bind)