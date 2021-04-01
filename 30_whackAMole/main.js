const moles = document.querySelectorAll(".mole");
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");


let score=0;
let isTimeUp;
let lastHole;

function randomTime(min, max){
    return Math.round(Math.random()*(max-min)+min);
}

function randomHole(holes){
    const idx= Math.floor(Math.random()*holes.length);
    const hole = holes[idx];
    if(lastHole === hole){
        return randomHole(holes);
    }
    lastHole=hole;
    return hole;
}

function peep(e){
    const hole=randomHole(holes);
    const time = randomTime(200, 800);
    hole.classList.add("up");

    setTimeout(()=>{
        hole.classList.remove('up');
        if(!isTimeUp) peep(); 
    },time);
}

function bonk(e){
    if(!e.isTrusted) return; // cheater!!
    score++;
    this.classList.remove("up");
    scoreBoard.textContent = score;
}


function startGame(){
    isTimeUp=false;
    score=0;
    scoreBoard.textContent=0;
    peep();
    setInterval(()=>{
        isTimeUp=true;
    },10000);
}

moles.forEach(mole=>mole.addEventListener("click",bonk));
