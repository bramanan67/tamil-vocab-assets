// ---- DATA: your 10 flashcards ----
const flashcards = [
  {
    tamil: "கப்பல்",
    english: "Ship",
    image: "kappal.png",
    audio: "kapal.mp3",
  },
  {
    tamil: "பீலி",
    english: "Peacock Feather",
    image: "peeli.png",
    audio: "peeli.mp3",
  },
  {
    tamil: "புறம்",
    english: "Place",
    image: "puram.png",
    audio: "puram.mp3",
  },
  {
    tamil: "பூயம்",
    english: "Shoulder",
    image: "puyam.png",
    audio: "puyam.mp3",
  },
  {
    tamil: "சமம்",
    english: "Equal",
    image: "samam.png",
    audio: "samam.mp3",
  },
  {
    tamil: "சரம்",
    english: "Flower Garland",
    image: "saram.png",
    audio: "saram.mp3",
  },
  {
    tamil: "சட்டம்",
    english: "Law",
    image: "sattam.png",
    audio: "sattam.mp3",
  },
  {
    tamil: "வீண்",
    english: "Waste",
    image: "veen.png",
    audio: "veen.mp3",
  },
  {
    tamil: "வீசு",
    english: "Throw",
    image: "veesu.png",
    audio: "veesu.mp3",
  },
  {
    tamil: "விமானம்",
    english: "Airplane",
    image: "vimanam.png",
    audio: "vimanam.mp3",
  },
];

// ---- STATE ----
let currentIndex = 0;
let showMeaning = false;
let audioPlayer = null;

// ---- ELEMENTS ----
const imgEl = document.getElementById("card-image");
const tamilEl = document.getElementById("card-tamil");
const englishEl = document.getElementById("card-english");
const progressEl = document.getElementById("progress-text");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const playBtn = document.getElementById("play-btn");
const toggleMeaningBtn = document.getElementById("toggle-meaning");

// ---- FUNCTIONS ----
function renderCard() {
  const card = flashcards[currentIndex];

  // image path relative to index.html
  imgEl.src = `images/${card.image}`;
  imgEl.alt = card.english;

  tamilEl.textContent = card.tamil;
  englishEl.textContent = card.english;

  // reset meaning visibility each time we change card
  showMeaning = false;
  englishEl.classList.add("hidden");
  toggleMeaningBtn.textContent = "Show";

  progressEl.textContent = `${currentIndex + 1} / ${flashcards.length}`;

  // disable/enable nav buttons
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === flashcards.length - 1;
}

function playAudio() {
  const card = flashcards[currentIndex];
  const src = `audio/${card.audio}`;

  if (!audioPlayer) {
    audioPlayer = new Audio();
  }

  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  audioPlayer.src = src;
  audioPlayer.play().catch((err) => {
    console.error("Audio play error:", err);
  });
}

function toggleMeaning() {
  showMeaning = !showMeaning;
  if (showMeaning) {
    englishEl.classList.remove("hidden");
    toggleMeaningBtn.textContent = "Hide";
  } else {
    englishEl.classList.add("hidden");
    toggleMeaningBtn.textContent = "Show";
  }
}

// ---- EVENT LISTENERS ----
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderCard();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < flashcards.length - 1) {
    currentIndex++;
    renderCard();
  }
});

playBtn.addEventListener("click", playAudio);
toggleMeaningBtn.addEventListener("click", toggleMeaning);

// ---- INIT ----
renderCard();
