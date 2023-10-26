const musicLibsContainer = document.getElementById('music-libs')
const audioPlayer = document.getElementById('audio_player')
const pausedBtn = document.getElementById("paused")
const playingBtn = document.getElementById("playing")



window.addEventListener('load', bootUpApp)

function bootUpApp() {
    fetchAndRenderAllSections();
}

function fetchAndRenderAllSections() {
    //fetch data
    fetch('./assests/js/ganna.json')
        .then(response => response.json())
        .then(response => {
            const { cardbox } = response
            if (Array.isArray(cardbox) && cardbox.length) {
                cardbox.forEach(section => {
                    const { songsbox, songscards } = section
                    renderSection(songsbox, songscards);
                })
            }
        })
        .catch((error) => {
            alert(error)
        })
}
function renderSection(title, songsList) {

    const songsSection = makeSectionDom(title, songsList);
    musicLibsContainer.appendChild(songsSection)
}
function makeSectionDom(title, songsList) {
    const sectionDiv = document.createElement('div')
    sectionDiv.className = "songs-sections"
    sectionDiv.innerHTML = `
    <h2 class="heading-section">${title}</h2>
    <div class="songs-container">
     ${songsList.map(songObj => buildSongCardDom(songObj)).join('')}
    </div>
    `
    return sectionDiv
}

function buildSongCardDom(songObj) {
    return `
<div class="songs-card" onclick="playSong(this)" data-songobj='${JSON.stringify(songObj)}'>
        <div class="img-container">
           <img src="/${songObj.image_source}" alt="${songObj.song_name}">
            <div class="overlay">
            </div>
        </div>
       <p class="songs-name">${songObj.song_name}</p>
</div>
`
}

// Music Player

function playSong(songCardEl) {
    const songObj = JSON.parse(songCardEl.dataset.songobj)
    console.log(songObj)
    setCurrentSong(songObj)
    const musicPlayer = document.getElementById('music-player')
}

function setCurrentSong(songObj) {
    currentSongObj = songObj
    audioPlayer.pause()
    audioPlayer.src = songObj.quality.low
    audioPlayer.currentTime = 0
    audioPlayer.play()
    updatePlayUi(songObj)
}

function updatePlayUi(songObj) {
    const songImg = document.getElementById("song-img")
    const songName = document.getElementById("song-name")

    songImg.src = songObj.image_source
    songName.innerHTML = songObj.song_name




}
function toggleplayer() {

    if (audioPlayer.paused) {
        audioPlayer.play()
   
    }
    else {
        audioPlayer.pause()
    }
}

