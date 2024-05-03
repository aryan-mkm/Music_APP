let songsData = [
    { songName: "Tu Hi Mujhko Bta De", filepath: "Songs/Tu Hi Mujhko Bta De.mp3", coverpath: "Cover/tu hi.Jpg" },
    { songName: "Main Tenu Samjhawa Ki", filepath: "Songs/2.mp3", coverpath: "Cover/2.Jpeg" },
    { songName: "Phir aur kya chahiye", filepath: "Songs/3.mp3", coverpath: "Cover/3.Jpeg" },
    { songName: "Tera Yaar Hoon Main", filepath: "Songs/4.mp3", coverpath: "Cover/4.Jpeg" },
    { songName: "Channa mereya", filepath: "Songs/5.mp3", coverpath: "Cover/5.jpeg" },
];

async function getSongs() {
    let formattedSongs = await Promise.all(songsData.map(async (song, index) => {
        let duration = await getAudioDuration(song.filepath);
        return {
            id: (index + 1),
            name: song.songName,
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, consectetur.",
            rating: "3.5",
            timing: formatDuration(duration),
            song_path: song.filepath,
            song_coverimage: song.coverpath,
        };
    }));
    return formattedSongs;
}

async function getSongById(id) {
    let songs = await getSongs();
    return songs.find(song => song.id === id);
}

async function getAllSongs() {
    let formattedSongs = await getSongs();
    return formattedSongs;
}

function formatDuration(durationInSeconds) {
    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = Math.floor(durationInSeconds % 60);
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function getAudioDuration(audioFilePath) {
    return new Promise((resolve, reject) => {
        let audio = new Audio(audioFilePath);

        audio.onloadedmetadata = () => {
            resolve(audio.duration);
        };

        audio.onerror = (error) => {
            reject(error);
        };
    });
}

// getAllSongs();

// // Example usage of getSongById function
// getSongById('02').then(song => console.log(song));


export {getAllSongs,getSongById};