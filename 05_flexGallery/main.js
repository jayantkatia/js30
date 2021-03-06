const panels = document.querySelectorAll('.panel');

function toggleOpen(){
    this.classList.toggle('open');
}

function toggleTranslate(e){
    if(e.propertyName.includes('flex')){
        this.classList.toggle('open-panel');
    }
}


panels.forEach(panel=>panel.addEventListener('click',toggleOpen));
panels.forEach(panel=>panel.addEventListener('transitionend',toggleTranslate));