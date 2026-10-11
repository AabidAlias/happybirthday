const jokes = [
  "Why was the birthday cake sad? It felt crumby!",
  "What does a cake say to a friend? You're the icing on my day!",
  "Why do candles always go on top of cakes? Because it’s hard to light them from the bottom!"
];

let hasCapturedPhoto = false;

function showBirthdayMessage() {
  const nameInput = document.getElementById('nameInput');
  const fontSelector = document.getElementById('fontSelector');
  const messageDiv = document.getElementById('birthdayMessage');
  const messageTitle = messageDiv.querySelector('h2');
  const birthdaySong = document.getElementById('birthdaySong');
  const birthdayJoke = document.getElementById('birthdayJoke');

  const name = nameInput.value.trim();

  if (!hasCapturedPhoto) {
    alert("First click a photo so you can enjoy this moment and celebrate!");
    return;
  }

  if (name) {
    messageTitle.style.fontFamily = fontSelector.value;
    messageTitle.textContent = `Happy Birthday, ${name}! 🎉`;
    birthdayJoke.textContent = `Birthday joke: ${jokes[Math.floor(Math.random() * jokes.length)]}`;
    revealBirthdayContent(messageDiv);
    birthdaySong.play();
    saveToHistory(name); // Save entry to history
    celebrateWithConfetti();
  } else {
    alert("Please enter your name to celebrate!"); // Alert if no name is entered
  }
}

// Camera functionality
const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');
const captureButton = document.getElementById('captureButton');
const openCameraButton = document.getElementById('openCameraButton');

function openCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.classList.remove('hidden');
      openCameraButton.classList.add('hidden');
      captureButton.classList.remove('hidden');
    })
    .catch((error) => {
      console.error("Camera access denied:", error);
      openCameraButton.classList.remove('hidden');
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
  hasCapturedPhoto = true;

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
  openCameraButton.classList.remove('hidden');
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

function celebrateWithConfetti() {
  confetti({
    particleCount: 150,
    spread: 80,
    startVelocity: 40,
    decay: 0.9,
    origin: { y: 0.7 }
  });
}

function revealBirthdayContent(messageDiv) {
  const items = messageDiv.querySelectorAll('.reveal-item');
  items.forEach((item) => item.classList.add('hidden'));
  messageDiv.classList.remove('hidden');

  items.forEach((item, index) => {
    setTimeout(() => item.classList.remove('hidden'), index * 700);
  });
}
