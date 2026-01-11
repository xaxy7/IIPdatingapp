// ---------- STATE ----------
let html5QrCode = null;
let scannerRunning = false;
let scanLockUntil = 0;

let love = 50;
let currentPerson = null;

// ---------- DOM ----------
const screens = {
  start: document.getElementById("screen-start"),
  game: document.getElementById("screen-game"),
  results: document.getElementById("screen-results-blue"),
};

const startButton = document.getElementById("startButton");
const playAgainBlue = document.getElementById("playAgainBlue");
const toastArea = document.getElementById("toastArea");

const nameEl = document.getElementById("currentName");
const loveEl = document.getElementById("loveMeter");
const resultsTitle = document.getElementById("resultsTitle");
const resultsCaption = document.getElementById("resultsCaption");

// ---------- SCREEN SYSTEM ----------
function showScreen(name) {
  Object.values(screens).forEach(el => el.classList.remove("screen--active"));
  screens[name].classList.add("screen--active");
}

// ---------- TOAST ----------
function showToast(text, time = 1500) {
  toastArea.innerHTML = `<div class="toast">${text}</div>`;
  setTimeout(() => toastArea.innerHTML = "", time);
}

// ---------- CAMERA ----------
function initScanner() {
  if (html5QrCode) return;
  html5QrCode = new Html5Qrcode("qr-reader");
}

function startScanner() {
  if (scannerRunning) return;
  initScanner();

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    onScan
  ).then(() => scannerRunning = true);
}

function stopScanner() {
  if (!scannerRunning) return;
  html5QrCode.stop().then(() => scannerRunning = false);
}

// ---------- QR ----------
function onScan(text) {
  const now = Date.now();
  if (now < scanLockUntil) return;
  scanLockUntil = now + 800;

  const [name, game] = text.split("|");

  currentPerson = name;
  nameEl.textContent = name;
  showToast(`🎮 Likes ${game}`);
}

// ---------- GAME ----------
function changeLove(v) {
  love = Math.max(0, Math.min(100, love + v));
  loveEl.textContent = love;
}

function ghost() {
  stopScanner();
  resultsTitle.textContent = "👻 GHOSTED";
  resultsCaption.textContent = currentPerson
    ? `You ghosted ${currentPerson}`
    : "No one scanned";
  showScreen("results");
}

// ---------- EVENTS ----------
startButton.addEventListener("click", () => {
  love = 50;
  loveEl.textContent = love;
  nameEl.textContent = "Scan someone";
  currentPerson = null;

  showScreen("game");
  startScanner();
});

playAgainBlue.addEventListener("click", () => {
  stopScanner();
  showScreen("start");
});
