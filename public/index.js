var popup

var logs = []
function log(message, ...args) {
  logs.unshift(JSON.stringify({ message, args, timestamp: Date.now() }))
}

function handlePopupClosed(e) {
  document.getElementById("status").innerText = "popup closed"
  popup = null;
}

function closePopup() {
  if (popup && popup.window) {
    popup.window.closePopup()
  }
}

function openPopup() {
  if (popup) {
    popup.focus()
    return;
  }
  document.getElementById("status").innerText = "new popup opened"
  const left = document.body.clientLeft + (window.innerWidth * 0.5) - 100
  const top = document.body.clientTop + (window.innerHeight * 0.5) - 75
  popup = window.open("/popup/popup.html", "_blank", `height=500,width=500,left=${left},top=${top},resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no, status=yes`);
  popup.window.addEventListener("beforeunload", handlePopupClosed)
  popup.window.log = log
}

function gracefulExit() {
  closePopup();
}

function bind() {
  document.getElementById("open-popup").addEventListener('click', openPopup)
  document.getElementById("close-popup").addEventListener('click', closePopup)
  document.getElementById("status").innerText = "ready"
  document.title = "Ready!"
  window.name = "parent window"

  window.addEventListener("beforeunload", gracefulExit)
  setInterval(() => {
    document.getElementById("logs").innerText = logs.join("\n\n")
  }, [])
}

window.addEventListener("load", bind)