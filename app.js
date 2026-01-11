let love = 50
let html5QrCode

function startApp() {
  document.getElementById("home").classList.remove("active")
  document.getElementById("camera").classList.add("active")
  startScanner()
}

function startScanner() {
  html5QrCode = new Html5Qrcode("reader")

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    qrSuccess
  )
}

function qrSuccess(text) {
  // expected: name|game
  const parts = text.split("|")
  document.getElementById("name").innerText = parts[0]
  document.getElementById("game").innerText = "Game: " + parts[1]

  document.getElementById("ghostScreen").style.display = "none"
}

function changeLove(amount) {
  love += amount
  if (love > 100) love = 100
  if (love < 0) love = 0
  document.getElementById("love").innerText = love + "%"
}

function ghost() {
  document.getElementById("ghostScreen").style.display = "flex"
  document.getElementById("ghostScreen").innerText = "👻 GHOSTED"
}
