console.log("Welcome to Music Player");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemsContainer = document.querySelector('.songItemContainer');
let searchInput = document.getElementById('searchInput');

let songs = [
    {songName: "Never Gonna Give You Up - Rick Astley", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Jaane Kyun - Dostana", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Jab Mila Tu - IHLS", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Dildaara (Stand By Me)", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "I'm Yours - Jason Mraz", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "I Wanna Be Yours - Arctic Monkeys", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Baby I'm Yours - Arctic Monkeys", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Mirrors - Justin Timberlake", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Kyon - Papon(Barfi)", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Only Girl - Stephen Sanchez", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

// Function to render the song list
const renderSongs = (songsArray) => {
    songItemsContainer.innerHTML = "";
    songsArray.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('songItem');
        songItem.innerHTML = `
            <img alt="${index}" src="${song.coverPath}">
            <span class="songName">${song.songName}</span>
            <span class="songlistplay">
                <span class="timestamp">05:34 <i id="${index}" class="far songItemPlay fa-play-circle"></i> </span>
            </span>
        `;
        songItemsContainer.appendChild(songItem);
    });
};

// Initial render of songs
renderSongs(songs);

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Function to reset play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Event listener for play button in song items
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Event listener for next button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Event listener for previous button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Event listener for search input
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter((song) => song.songName.toLowerCase().includes(searchTerm));
    renderSongs(filteredSongs);
});
