const videoPlayer = document.querySelector('video.viewer');

const playerButton = document.querySelector('.player__button.toggle');
[playerButton, videoPlayer].forEach(elem => elem.addEventListener('click', togglePlay));

videoPlayer.addEventListener('ended', updatePlayButton);

function updatePlayButton() {
    if (videoPlayer.paused) playerButton.innerHTML = '►';
    else playerButton.innerHTML = '&#9616;&nbsp;&#9612;';
}
function togglePlay() {
    if(videoPlayer.paused) videoPlayer.play();
    else videoPlayer.pause();
    updatePlayButton();
}

document.querySelectorAll('[data-skip]').forEach(elem => elem.addEventListener('click', () => {
    videoPlayer.currentTime += parseInt(elem.dataset.skip);
}));

var mouseDown = [false, false];

document.querySelectorAll('.player__slider').forEach((elem, id) => {
    elem.addEventListener('mousedown', () => mouseDown[id] = true);
    elem.addEventListener('mouseup', () => mouseDown[id] = false);

    ['mousemove', 'change'].forEach(type => {
        elem.addEventListener(type, () => {
            if (!mouseDown[id] && type === 'mousemove') return;
            if (elem.name === 'volume') videoPlayer.volume = elem.value;
            else if (elem.name === 'playbackRate') videoPlayer.playbackRate = elem.value;
        });
    }); 
});

videoPlayer.addEventListener('timeupdate', changeVideoProgress);

const progress = document.querySelector('.progress__filled');
function changeVideoProgress() {
    progress.style.flexBasis = videoPlayer.currentTime / videoPlayer.duration * 100 + '%';
}

const progressMain = document.querySelector('.progress');
let progressChangeable = false;
progressMain.addEventListener('mousedown', () => progressChangeable = true);
document.addEventListener('mouseup', () => progressChangeable = false);

['mousemove', 'click'].forEach(type => {
    progressMain.addEventListener(type, e => {
        if(!progressChangeable && type === 'mousemove') return;
        videoPlayer.currentTime = e.offsetX / progressMain.offsetWidth * videoPlayer.duration;
    })
});