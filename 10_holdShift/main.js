const inputs = document.querySelectorAll('input[type="checkbox"]');

let lastChecked;

function handleCheck(e){
    //checking lastChecked allows user to press shift even when selecting the start input 
    if(lastChecked && e.shiftKey){
        let checked=this.checked;
        let inBetween = false;
        inputs.forEach(input=>{
            if(this == input || input == lastChecked){
                inBetween=!inBetween;
            }
            if(inBetween){
                input.checked=checked;
            }
        });
        lastChecked = null;
        //this is done to ensure pairwise selection/unselection
    }
    lastChecked=this;
};

inputs.forEach(input=>input.addEventListener('click',handleCheck));
