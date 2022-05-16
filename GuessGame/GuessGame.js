const rgbEl = document.getElementById("rgb");
const divsEl = document.querySelectorAll(".color");
const parEl = document.getElementById("par");
const resetEl = document.getElementById("reset");

function playGame(){

    let colors = [];
    let play = true;
    for(let i=0; i < divsEl.length; i++){
        num1 = Math.floor(Math.random() * 256);
        num2 = Math.floor(Math.random() * 256);
        num3 = Math.floor(Math.random() * 256);
        colors.push([num1, num2, num3]);
        divsEl[i].style.backgroundColor = `rgb(${colors[i]})`;    
    }
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    rgbEl.textContent += `(${randomColor})`;
    for(let i=0; i < divsEl.length; i++){
        divsEl[i].addEventListener("click", () => {
            if(play){
                if(colors[i] === randomColor)
                    parEl.textContent = "CORRECT!!!";
                else
                    parEl.textContent = "WRONG!!!";
                play = false;
            }
        })
    }
}

playGame();
resetEl.addEventListener("click", () => {
    rgbEl.textContent = "RGB ";
    parEl.textContent = "";
    playGame();
})