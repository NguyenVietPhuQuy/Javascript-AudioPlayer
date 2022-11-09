
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playPause_btn = document.querySelector('.playPause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.querySelector('#wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index=0;
let isPlaying =false;
let isRandom =false;
let updateTimer;

const music_list = [
    {
        img: '/Images/QuaiVatTiHon.jpg',
        name: 'Vì Đời',
        artist: 'Qúai Vật Tí Hon',
        music: 'Musics/QuaiVatTiHon/Vi-Doi-Quai-Vat-Ti-Hon.mp3'
    },
    {
        img: '/Images/Chilles.jpg',
        name: 'Gía Như',
        artist: 'Chilles',
        music: '/Musics/Chilles/GiaNhu-Chillies-7016096.mp3'
    }

]
loadTrack(track_index);
function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();
    track_art.style.backgroundImage ="url("+ music_list[track_index].img+")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "playing music" +" " +(track_index+1) +" "+ "of" +" "+ music_list.length;

    updateTimer = setInterval(setUpdate,1000);

    curr_track.addEventListener('ended',nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e']
    let a;

    function populate(a){
        for(let i=0;i<6;i++){
            let x =math.round(Math.random()*14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';
    let gradient = 'linear-gradient('+angle+','+ Color1+','+ Color2+')';
    document.body.style.background =gradient;
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent ="00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom ():playRandom();
}

function playRandom(){
    isRandom =true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom =false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playPauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying =true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playPause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playPause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'
}

function nextTrack(){
    if (track_index<music_list.length -1 && isRandom === false)
    {track_index+=1}
    else if (track_index< music_list.length -1 && isRandom ===true)
    {let random_index =number.parseInt(Math.random()*music_list.length)}
}