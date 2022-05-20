const items = document.querySelectorAll(".item");
const reset = document.getElementById("reset");
const p = document.getElementById("p");
let game = true;
let w = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let count = 1;

function checkIfWin(){
    for(let i=0; i < w.length; i++){
        if(items[w[i][0]].textContent === items[w[i][1]].textContent && items[w[i][1]].textContent === items[w[i][2]].textContent && items[w[i][0]].textContent != ""){
            game = false;
            p.textContent += "THE WINNER IS " + items[w[i][0]].textContent + "!!!!!"; 
            break;
        }
    }
}

for(let i=0; i < items.length; i++){
    items[i].addEventListener("click", () => {
    if(game){   
        if(items[i].textContent === ""){
            if(count % 2 == 1)
                items[i].textContent = 'X';
            else
                items[i].textContent = 'O';
            count++;
            checkIfWin();
        }
    }    
    })
}

reset.addEventListener("click", () => {
    for(let i=0; i < items.length; i++)
        items[i].textContent = "";
    p.textContent = "";
    game = true;
    count = 1;
})