const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const takePhotoBtn = document.querySelector('.takePhoto');

const redBtn = document.querySelector('.redBtn');
const rgbBtn = document.querySelector('.rgbBtn');
const ghostBtn = document.querySelector('.ghostBtn');
const clearBtn = document.querySelector('.clearBtn');


let isSplit = false;
let isRedEffect = false;
let isGhostEffect = false;


function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error("Oh Nooo!!", err);
        });
}

function paintToCanvas() {
    const { videoWidth: width, videoHeight: height } = video;
    canvas.width = width;
    canvas.height = height;
    console.log(width, height);

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);

        if (isRedEffect) {
            pixels = redEffect(pixels);
        } else if (isSplit) {
            pixels = rgbSplit(pixels);
        }

        if (isGhostEffect) {
            ctx.globalAlpha = 0.1;
        } else {
            ctx.globalAlpha = 1;
        }

        pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 32);
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach(input => {
        levels[input.name] = input.value;
    });
    let red, blue, green = 0;
    for (let i = 0; i < pixels.data.length; i += 4) {
        red = pixels.data[i];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];

        if (red >= levels.rmin && green >= levels.gmin && blue >= levels.bmin && red <= levels.rmax && green <= levels.gmax && blue <= levels.bmax) {
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 80;
        pixels.data[i + 1] = pixels.data[i + 1] - 50;
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i];
        pixels.data[i + 100] = pixels.data[i + 1];
        pixels.data[i + 150] = pixels.data[i + 2];
    }
    return pixels;
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'Cool_person');
    link.innerHTML = `<img src="${data}" alt="Cool Person">`;
    strip.insertBefore(link, strip.firstChild);
}

video.addEventListener('canplay', paintToCanvas);

takePhotoBtn.addEventListener('click', takePhoto);
redBtn.addEventListener('click', () => {
    isRedEffect = true;
    isSplit = false;
});

rgbBtn.addEventListener('click', () => {
    isRedEffect = false;
    isSplit = true;
});

ghostBtn.addEventListener('click', () => isGhostEffect = !isGhostEffect);
clearBtn.addEventListener('click', () => {
    isRedEffect = false;
    isSplit = false;
    isGhostEffect = false;
});

getVideo();
