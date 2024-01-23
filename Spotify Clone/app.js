const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Dummy song data
let songs = [
    { id: 1, songName: 'Never Gonna Give You Up - Rick Astley', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg' },
    { id: 2, songName: "Jaane Kyun - Dostana", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { id: 3, songName: "Jab Mila Tu - IHLS", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    { id: 4, songName: "Dildaara (Stand By Me)", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    { id: 5, songName: "I'm Yours - Jason Mraz", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    { id: 6, songName: "I Wanna Be Yours - Arctic Monkeys", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    { id: 7, songName: "Baby I'm Yours - Arctic Monkeys", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    { id: 8, songName: "Mirrors - Justin Timberlake", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    { id: 9, songName: "Kyon - Papon(Barfi)", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    { id: 10, songName: "Only Girl - Stephen Sanchez", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    // Add more songs here
];

// Get all songs
app.get('/api/songs', (req, res) => {
    res.json(songs);
});

// Get a specific song by ID
app.get('/api/songs/:id', (req, res) => {
    const songId = parseInt(req.params.id);
    const song = songs.find((s) => s.id === songId);

    if (song) {
        res.json(song);
    } else {
        res.status(404).json({ message: 'Song not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
