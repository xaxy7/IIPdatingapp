let love = 50
let html5QrCode = null
let scannerRunning = false

const screens = {
  home: document.getElementById("screen-home"),
  camera: document.getElementById("screen-camera")
}

function showScreen(name) {
  Object.values(screens).forEach(el => el.classList.remove("screen--active"))
  screens[name].classList.add("screen--active")
}

function startApp() {
  showScreen("camera")
  setTimeout(startScanner, 200)
}

function initScanner() {
  if (html5QrCode) return
  html5QrCode = new Html5Qrcode("reader")
}

function startScanner() {
  if (scannerRunning) return
  initScanner()

  const config = {
    fps: 10,
    qrbox: (vw, vh) => {
      const size = Math.floor(Math.min(vw, vh) * 0.7)
      return { width: size, height: size }
    }
  }

  html5QrCode.start(
    { facingMode: "environment" },
    config,
    qrSuccess
  ).then(() => {
    scannerRunning = true
  }).catch(err => {
    console.error(err)
    alert("Camera failed to start")
  })
}

function qrSuccess(text) {
  const parts = text.split("|")
  document.getElementById("name").innerText = parts[0] || "Unknown"
  document.getElementById("game").innerText = parts[1] ? "Game: " + parts[1] : ""
  document.getElementById("ghostScreen").style.display = "none"
}

function changeLove(amount) {
  love = Math.max(0, Math.min(100, love + amount))
  document.getElementById("love").innerText = love + "%"
}

function ghost() {
  const g = document.getElementById("ghostScreen")
  g.style.display = "flex"
  g.innerText = "👻 GHOSTED"
}
