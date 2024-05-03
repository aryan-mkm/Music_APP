"use strict";
import { getAllSongs, getSongById } from "./module.js";

let all_song = await getAllSongs();

// console.log(all_song);

let music_list = document.getElementById("music_list");

// setup for song 

let song_coverimage = document.getElementById("song_img");
let song_name = document.getElementById("song_name");
let song_desc = document.getElementById("song_desc");
let song_rating = document.getElementById("song_rating");
let song_name_title = document.getElementById("song_name_title");

function setSongTheme(song_id) {
  getSongById(song_id).then(song => {
    song_coverimage.src = song.song_coverimage;
    song_name.innerText = song.name;
    song_name_title.innerText = song.name;
    song_desc.innerText = song.desc;
    song_rating.innerText = `RATING : ${song.rating}/5`;
    playSong(song.song_path, song.id);
  });
}



let currentAudioElement, current_song_index, volume_status;

function playSong(songPath, song_id) {

  if (currentAudioElement) {
    currentAudioElement.pause();

    document.getElementById("mainPlayBtn").classList.add("bx-play");
    document.getElementById("mainPlayBtn").classList.remove("bx-pause");
    console.log("song id - ", current_song_index);
    console.log("song id - ", song_id);
    document.querySelector(`#play_audio_${song_id}`).classList.remove("bx-pause")
    document.querySelector(`#play_audio_${song_id}`).classList.add("bx-play")

  } else {
    document.getElementById("mainPlayBtn").classList.remove("bx-play");
    document.getElementById("mainPlayBtn").classList.add("bx-pause");
  }

  let audioElement = new Audio(songPath);
  audioElement.play();

  let progressSlider = document.getElementById('progressSlider');
  audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    console.log(audioElement.durationInSeconds);
  
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    console.log(progress);
    progressSlider.value = progress;
    progressSlider.style.setProperty('--value', progress )
  });

  document.getElementById("mainPlayBtn").classList.remove("bx-play");
  document.getElementById("mainPlayBtn").classList.add("bx-pause");


  current_song_index = song_id
  currentAudioElement = audioElement;

  handlePlayBtn(song_id, current_song_index);
}


function pauseSong(song_id, current_song_index) {
  if (currentAudioElement) {
    currentAudioElement.pause();
    document.getElementById("mainPlayBtn").classList.add("bx-play");
    document.getElementById("mainPlayBtn").classList.remove("bx-pause");
    console.log("song id - ", current_song_index);
    console.log("song id - ", song_id);
    document.querySelector(`#play_audio_${song_id}`).classList.remove("bx-pause")
    document.querySelector(`#play_audio_${song_id}`).classList.add("bx-play")
  }

}


function handlePlayBtn(song_id, curr_index) {

  document.querySelector(`#play_audio_${curr_index}`).classList.remove("bx-pause")
  document.querySelector(`#play_audio_${curr_index}`).classList.add("bx-play")

  document.querySelector(`#play_audio_${song_id}`).classList.remove("bx-play")
  document.querySelector(`#play_audio_${song_id}`).classList.add("bx-pause")

}

all_song.map((item, i) => {
  // console.log(item);
  let elem = document.createElement("div");
  elem.classList.add("music");
  elem.innerHTML = `
        <div class="music_no">${item.id}</div>
        <div class="music_name">${item.name}</div>
        <div class="music_duration">${item.timing}</div>
        <div class="music_play">
            <i class='bx bx-play' id="play_audio_${item.id}"></i>
        </div>
    `;
  elem.addEventListener("click", () => {

    handlePlayBtn(item.id, current_song_index);
    setSongTheme(item.id);

  });

  music_list.appendChild(elem);

})

mainPlayBtn.addEventListener("click", () => {
  if (!currentAudioElement.paused) {
    pauseSong(current_song_index, current_song_index);
  } else {
    currentAudioElement.play();

    document.getElementById("mainPlayBtn").classList.remove("bx-play");
    document.getElementById("mainPlayBtn").classList.add("bx-pause");

    document.querySelector(`#play_audio_${current_song_index}`).classList.remove("bx-play")
    document.querySelector(`#play_audio_${current_song_index}`).classList.add("bx-pause")

  }
})


const previousSong = document.getElementById("previousSong");
previousSong.addEventListener("click", () => {
  console.log(current_song_index);
  if (current_song_index > 1 && current_song_index <= all_song.length) {
    document.querySelector(`#play_audio_${current_song_index}`).classList.remove("bx-pause")
    document.querySelector(`#play_audio_${current_song_index}`).classList.add("bx-play")

    setSongTheme(--current_song_index);
  }
})

const nextSong = document.getElementById("nextSong");
nextSong.addEventListener("click", () => {
  console.log(current_song_index);

  if (current_song_index >= 1 && current_song_index < all_song.length) {
    document.querySelector(`#play_audio_${current_song_index}`).classList.remove("bx-pause")
    document.querySelector(`#play_audio_${current_song_index}`).classList.add("bx-play")

    setSongTheme(++current_song_index);
  }
})

const volume = document.getElementById("volume");
volume.addEventListener("click",()=>{
  if(volume_status){
    volume_status=false;
    currentAudioElement.volume = 0;
    volume.classList.remove("bx-volume-full")
    volume.classList.add("bx-volume-mute")
    volume.classList.add("active")

  }else{
    volume_status=true;
    currentAudioElement.volume = 1;
    volume.classList.remove("bx-volume-mute")
    volume.classList.remove("active")
    volume.classList.add("bx-volume-full")
  }
})


setSongTheme(1);

