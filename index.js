"use strict";

const songs = [
    {
        name: "Srivalli",
        source: "songs/srivalli.mp3",
        poster: "images/srivalli.png",
        artist: "Sid Sriram",
    },
    {
        name: "Vachindamma",
        source: "songs/vachindamma.mp3",
        poster: "images/vachindamma.jpg",
        artist: "Sid Sriram",
    },
    {
        name: "Nee Kannu Neeli Samudram",
        source: "songs/Nee Kannu Neeli Samudram.mp3",
        poster: "images/Nee Kannu Neeli Samudram.jpg",
        artist: "Javed Ali",
    },
    {
        name: "Sara Sara Saara Kathu",
        source: "songs/Sara Sara Saara Kathu.mp3",
        poster: "images/sara sara saara kathu.jpg",
        artist: "Chinmayi Sripada",
    },
];

const player = document.querySelector(".music__player");
const playBtn = document.querySelector(".play__btn");
const pauseBtn = document.querySelector(".pause__btn");
const prevBtn = document.querySelector(".prev i");
const nextBtn = document.querySelector(".next i");
const audio = document.querySelector("audio");
const poster = document.querySelector(".song__poster img");
const title = document.querySelector(".song__title");
const artist = document.querySelector(".song__artist");
const currentTimestamp = document.querySelector(".current__time");
const durationTimestamp = document.querySelector(".duration");
const progressBar = document.querySelector(".progress__bar");
const progress = document.querySelector(".progress");
let currentSongIndex = 0;
let currentTimeMinute, currentTimeSecond, durationMinute, durationSecond;

const initialSong = () => {
    audio.src = songs[currentSongIndex].source;
    title.textContent = songs[currentSongIndex].name;
    poster.src = songs[currentSongIndex].poster;
    artist.textContent = songs[currentSongIndex].artist;
};

initialSong();
audio.volume = 0.6;

const playSong = () => {
    audio.play();
    playBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
};

const pauseSong = () => {
    audio.pause();
    playBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
};

const loadSong = () => {
    initialSong();
    playSong();
};

const prevSong = () => {
    if (+currentTimeSecond > 3) loadSong();
    else if (+currentTimeMinute > 0) loadSong();
    else {
        currentSongIndex--;
        if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
        loadSong();
    }
};

const nextSong = () => {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) currentSongIndex = 0;
    loadSong();
};

playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("loadeddata", (e) => {
    durationMinute = String(Math.trunc(e.target.duration / 60)).padStart(2, 0);
    durationSecond = String(Math.trunc(e.target.duration % 60)).padStart(2, 0);
    durationTimestamp.textContent = `${durationMinute}:${durationSecond}`;
});

audio.addEventListener("timeupdate", (e) => {
    //prettier-ignore
    currentTimeMinute = String(Math.trunc(e.target.currentTime / 60)).padStart(2,0);
    //prettier-ignore
    currentTimeSecond = String(Math.trunc(e.target.currentTime % 60)).padStart(2, 0);
    //prettier-ignore
    currentTimestamp.textContent = `${currentTimeMinute}:${currentTimeSecond}`;
    progress.style.width = `${
        (e.target.currentTime / e.target.duration) * 100
    }%`;
});

progressBar.addEventListener("click", function (e) {
    //Here we have to use "this.clientWidth" instead of "e.target.clientWidth"
    //Because when we will go backward, the click will happen on "progress"
    //Then clientWidth will show wrong value
    progress.style.width = `${(e.offsetX / this.clientWidth) * 100}%`;
    audio.currentTime = (e.offsetX / this.clientWidth) * audio.duration;
    //prettier-ignore
    currentTimeMinute = String(Math.trunc(audio.currentTime / 60)).padStart(2,0);
    //prettier-ignore
    currentTimeSecond = String(Math.trunc(audio.currentTime % 60)).padStart(2,0);
});

audio.addEventListener("ended", () => {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) currentSongIndex = 0;
    loadSong();
});

document.addEventListener("keydown", (e) => {
    if (e.key === " ") audio.paused ? playSong() : pauseSong();
    if (e.key === "ArrowLeft") prevSong();
    if (e.key === "ArrowRight") nextSong();
});
