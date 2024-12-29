// Hardcoded song list
const songs = [
    { title: "Aasan Nahin Yahan", src: "./songs/song1.mp3", image: "./songs/song1.jpg" },
    { title: "Aashiqui (The Love Theme)", src: "./songs/song2.mp3", image: "./songs/song2.jpg" },
    { title: "Bhula Dena", src: "./songs/song3.mp3", image: "./songs/song3.jpg" },
    { title: "Chahun Main Ya Naa", src: "./songs/song4.mp3", image: "./songs/song4.jpg" },
    { title: "Sajni", src: "./songs/song5.mp3", image: "./songs/song5.jpg" },
    { title: "Aaj Se Teri", src: "./songs/song6.mp3", image: "./songs/song6.jpg" }

];

let currentSongIndex = 0;

// DOM Elements
const audioPlayer = document.getElementById("audio-player");
const songImage = document.getElementById("song-image");
const songTitle = document.getElementById("song-title");
const songSlider = document.getElementById("song-slider");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const volumeSlider = document.getElementById("volume-slider");
const volumeUpBtn = document.getElementById("volume-up");
const volumeDownBtn = document.getElementById("volume-down");
const volumePercentage = document.getElementById("volume-percentage");
const currentTimeDisplay = document.getElementById("current-time");
const totalDurationDisplay = document.getElementById("total-duration");

// Load a specific song
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    songImage.src = song.image || "./default.jpg"; // Fallback image
    audioPlayer.src = song.src;
    audioPlayer.load();
}

// Play/Pause Song
function playPauseSong() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "Pause";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "Play";
    }
}

// Play Next Song
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
}

// Play Previous Song
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
}

// Adjust Volume
function adjustVolume() {
    audioPlayer.volume = volumeSlider.value;
    updateVolumePercentage(audioPlayer.volume);
}

function increaseVolume() {
    audioPlayer.volume = Math.min(audioPlayer.volume + 0.1, 1);
    volumeSlider.value = audioPlayer.volume;
    updateVolumePercentage(audioPlayer.volume);
}

function decreaseVolume() {
    audioPlayer.volume = Math.max(audioPlayer.volume - 0.1, 0);
    volumeSlider.value = audioPlayer.volume;
    updateVolumePercentage(audioPlayer.volume);
}

function updateVolumePercentage(volume) {
    volumePercentage.textContent = `${Math.round(volume * 100)}%`;
}

// Update Song Slider
function updateSongSlider() {
    if (!isNaN(audioPlayer.duration)) {
        songSlider.max = audioPlayer.duration;
        songSlider.value = audioPlayer.currentTime;
    }
}

function seekSong() {
    audioPlayer.currentTime = songSlider.value;
}

// Update Time Display
function updateCurrentTime() {
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    if (!isNaN(audioPlayer.duration)) {
        totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
    }
}

function setTotalDuration() {
    if (!isNaN(audioPlayer.duration)) {
        totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
    }
}

// Format time as MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Event Listeners
audioPlayer.addEventListener("timeupdate", updateSongSlider);
audioPlayer.addEventListener("timeupdate", updateCurrentTime);
audioPlayer.addEventListener("loadedmetadata", setTotalDuration);
songSlider.addEventListener("input", seekSong);
playPauseBtn.addEventListener("click", playPauseSong);
nextBtn.addEventListener("click", playNextSong);
prevBtn.addEventListener("click", playPrevSong);
volumeSlider.addEventListener("input", adjustVolume);
volumeUpBtn.addEventListener("click", increaseVolume);
volumeDownBtn.addEventListener("click", decreaseVolume);

// Initialize
loadSong(currentSongIndex);
audioPlayer.volume = 0.5;
updateVolumePercentage(audioPlayer.volume);