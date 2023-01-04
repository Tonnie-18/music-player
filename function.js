const musicContainer= document.querySelector('.container');
const previous= document.querySelector('#previous');
const play= document.querySelector('#play');
const next= document.querySelector('#next');
const progressContainer= document.querySelector('.progress-container');
const progress= document.querySelector('.progress');
const songTitle= document.querySelector('#songTitle');
const cover= document.querySelector('#cover');
const audio= document.querySelector('#audio');
const seek = document.querySelector('.seek');

//song titles

const songs=['poloG','migos','malone']

//keeping track of the song

let songIndex=0;

//loading song info in the dom

loadSong(songs[songIndex])

//update song details

function loadSong(song){
    songTitle.innerText=song
    audio.src =`music/${song}.mp3`
    cover.src= `images/${song}.jpg`
};

function playSong(){
    musicContainer.classList.add('playing');
    play.querySelector('i.bi').classList.remove('bi-play')
    play.querySelector('i.bi').classList.add('bi-pause')

    audio.play()
};

function pauseSong(){
    musicContainer.classList.remove('playing');
    play.querySelector('i.bi').classList.add('bi-play')
    play.querySelector('i.bi').classList.remove('bi-pause')  
    
    audio.pause()
}

function prevSong(){
    songIndex--
    if(songIndex< 0){
        songIndex=songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
};

function nextSong(){
    songIndex++
    if(songIndex>songs.length - 1){
        songIndex=0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e){
    const {duration, currentTime}= e.srcElement
    const progressPercent = (currentTime / duration)*100
    progress.style.width=`${progressPercent}%`
    seek.style.position=`${progressPercent}%`
}

function setProgress(e){
    const width= this.clientWidth
    const clickX=e.offsetX
    const duration= audio.duration

    audio.currentTime= (clickX/width)*duration
}    
//event listeners

play.addEventListener('click',()=>{
    const isPlaying=musicContainer.classList.contains ('playing');

    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
});

//change song events

previous.addEventListener('click',prevSong)
next.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress)
progressContainer.addEventListener('click',setProgress)

audio.addEventListener('ended',nextSong)

//loading songs from local storage

// localStorage.setItem("path","music/y2mate.com - DJ Durel Migos  Hot Summer Official Video.mp3");