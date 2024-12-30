const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const volumePercentage = document.getElementById('volume-percentage');
const autoplayToggle = document.getElementById('autoplay');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const songImage = document.getElementById('song-image');
const songTitle = document.getElementById('song-title');
const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');

const songs = [
    { title: "Aasan Nahin Yahan", src: "./songs/song1.mp3", image: "./songs/song1.jpg" },
    { title: "Aashiqui (The Love Theme)", src: "./songs/song2.mp3", image: "./songs/song2.jpg" },
    { title: "Bhula Dena", src: "./songs/song3.mp3", image: "./songs/song3.jpg" },
    { title: "Chahun Main Ya Naa", src: "./songs/song4.mp3", image: "./songs/song4.jpg" },
    { title: "Sajni", src: "./songs/song5.mp3", image: "./songs/song5.jpg" },
    { title: "Aaj Se Teri", src: "./songs/song6.mp3", image: "./songs/song6.jpg" }
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    songImage.src = song.image;
    songTitle.textContent = song.title;
    audioPlayer.load();
}

function playSong() {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = 'Pause';
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.textContent = 'Play';
}

function updateTimers() {
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
    const durationMinutes = Math.floor(audioPlayer.duration / 60);
    const durationSeconds = Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0');

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
}

function setProgress(e) {
    const width = progressBar.offsetWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;

    audioPlayer.currentTime = (clickX / width) * duration;
}

function updateVolume() {
    audioPlayer.volume = volumeControl.value / 100;
    volumePercentage.textContent = `${volumeControl.value}%`;
}

function handleSearch() {
    const query = searchBar.value.trim().toLowerCase();
    searchResults.innerHTML = '';

    if (query === '') {
        searchResults.style.display = 'none';
        return;
    }

    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query));

    filteredSongs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentSongIndex = songs.indexOf(song);
            loadSong(currentSongIndex);
            playSong();
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
        });
        searchResults.appendChild(li);
    });

    searchResults.style.display = 'block';
}

playPauseBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

volumeControl.addEventListener('input', updateVolume);

autoplayToggle.addEventListener('change', () => {
    audioPlayer.loop = false;
});

audioPlayer.addEventListener('timeupdate', updateTimers);

progressBar.addEventListener('click', setProgress);

audioPlayer.addEventListener('ended', () => {
    if (autoplayToggle.checked) {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    } else {
        pauseSong();
    }
});

searchBar.addEventListener('input', handleSearch);

// Load the initial song
loadSong(currentSongIndex);
updateVolume();
