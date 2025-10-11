function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  document.body.style.background = document.body.classList.contains('dark-mode')
    ? 'linear-gradient(to right, #0f2027, #203a43, #2c5364)'
    : 'linear-gradient(to right, #fbc2eb, #a6c1ee)';
}

const jokes = [
  "Why was the birthday cake sad? It felt crumby!",
  "What does a cake say to a friend? You're the icing on my day!",
  "Why do candles always go on top of cakes? Because it’s hard to light them from the bottom!"
];

function showBirthdayMessage() {
  const nameInput = document.getElementById('nameInput');
  const fontSelector = document.getElementById('fontSelector');
  const messageDiv = document.getElementById('birthdayMessage');
  const messageTitle = messageDiv.querySelector('h2');
  const birthdaySong = document.getElementById('birthdaySong');

  const name = nameInput.value.trim();

  if (name) {
    messageTitle.style.fontFamily = fontSelector.value;
    messageTitle.textContent = `Happy Birthday, ${name}! 🎉`;
    messageDiv.classList.remove('hidden');
    birthdaySong.play();
    saveToHistory(name); // Save entry to history
  } else {
    alert("Please enter your name to celebrate!"); // Alert if no name is entered
  }
}

// Camera functionality
const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');
const captureButton = document.getElementById('captureButton');

function openCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.classList.remove('hidden');
      captureButton.classList.remove('hidden');
    })
    .catch((error) => {
      console.error("Camera access denied:", error);
    });
}

function capturePhoto() {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0);
  canvas.classList.remove('hidden');

  const imageData = canvas.toDataURL('image/png');
  saveImageToLocalStorage(imageData);

  // Display the captured photo in the history list only once
  displayCapturedPhotoOnce(imageData);

  stopCamera();
}

// Helper function to display only one photo at a time
function displayCapturedPhotoOnce(imageData) {
  const historyList = document.getElementById('history');
  historyList.innerHTML = ""; // Clear any previous entry
  const entry = document.createElement('li');
  entry.innerHTML = `<strong>Captured Photo:</strong><br/><img src="${imageData}" alt="Photo" width="50" />`;
  historyList.appendChild(entry);
}

function saveImageToLocalStorage(imageData) {
  localStorage.setItem('latestPhoto', imageData);
}


function stopCamera() {
  const stream = video.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());
  video.classList.add('hidden');
  captureButton.classList.add('hidden');
}

function saveToHistory(name) {
  const historyList = document.getElementById('history');
  const entry = document.createElement('li');
  const imageData = localStorage.getItem('latestPhoto');

  entry.innerHTML = `<strong>${name}</strong><br/><img src="${imageData}" alt="Photo" width="50" />`;
  historyList.appendChild(entry);
}

function saveImageToLocalStorage(imageData) {
  localStorage.setItem('latestPhoto', imageData);
}

// Confetti animation on Celebrate button click
document.querySelector("#celebrateButton").addEventListener("click", () => {
  confetti({
    particleCount: 150,
    spread: 80,
    startVelocity: 40,
    decay: 0.9,
    origin: { y: 0.7 }
  });
});
