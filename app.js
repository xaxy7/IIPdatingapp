let love = 50
let html5QrCode = null
let scannerRunning = false

function startApp() {
  document.getElementById("home").classList.remove("active")
  document.getElementById("camera").classList.add("active")

  // wait for CSS to apply so camera div is visible
  setTimeout(startScanner, 200)
}

function initScanner() {
  if (html5QrCode) return
  html5QrCode = new Html5Qrcode("reader")
}

function startScanner() {
  if (scannerRunning) return
  initScanner()

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
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
