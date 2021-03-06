const player = document.querySelector('.player');
const progress = player.querySelector('.progress');
const progress_filled = player.querySelector('.progress_filled');
const toggle = player.querySelector('.play_pause');
const skips = player.querySelectorAll('[data-skip]');
const ranges =player.querySelectorAll('input[type="range');
const video = player.querySelector('video');
const fullScreen = player.querySelector('.fullscreen');
//functions
const togglePlay=()=>{
    video[video.paused?'play':'pause']();
}

function updateButton(){
    const icon = this.paused ? "⏵︎" : "⏸︎";
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
    video[this.name]=this.value;
}

function handleProgressBar(){
    const percent = video.currentTime/video.duration*100;
    progress_filled.style.width=`${percent}%`;
}

function scrub(e){
    const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime=scrubTime;
}

let isFullScreen = false; 
function toggleFullScreen(){
    if(isFullScreen){
        video.width=640;
        video.height=358;
        isFullScreen=false;
    }else{
        video.width=window.innerWidth;
        video.height=window.innerHeight-2;
        isFullScreen=true;
    }

}
//
video.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',handleProgressBar);

toggle.addEventListener('click',togglePlay);

video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);


skips.forEach(button=>button.addEventListener('click',skip));


ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range=>range.addEventListener('mousemove',handleRangeUpdate));

let mousedown=false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousedown',()=>mousedown=true);
progress.addEventListener('mouseup',()=>mousedown=false);

progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));

fullScreen.addEventListener('click',toggleFullScreen);
