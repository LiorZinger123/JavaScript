const inputEl = document.getElementById("input");
const operatorsEl = document.querySelectorAll(".operator");
const equalsEl = document.getElementById("equals");
const clearEl = document.getElementById("clear");
const dotEl = document.getElementById("dot");
const numbersEl = document.querySelectorAll(".number");
let num = '';
let intNum = 0;
let result = null;
let NewNum = false;
let lastOperator = null;

for(let i=0; i < numbersEl.length; i++){
    numbersEl[i].addEventListener("click", () => {
        if(NewNum){
            inputEl.innerText = numbersEl[i].textContent;
            NewNum = false;
        }
        else
            inputEl.innerText += numbersEl[i].textContent;
        num += numbersEl[i].textContent;
        floatNum = parseFloat(num);
    })
}

for(let i=0; i < operatorsEl.length; i++){
    operatorsEl[i].addEventListener("click", () => {
        NewNum = true
        operator = operatorsEl[i].textContent;
        inputEl.innerText = operator;
        if(!result)
            result = floatNum;
        else
            calculate(lastOperator);
        lastOperator = operator;
        num = '';
    })
}

dotEl.addEventListener('click', () => {
    num += '.';
    inputEl.innerText += '.';
})

clearEl.addEventListener("click", () => {
    num = '';
    result = null;
    NewNum = false;
    lastOperator = null;
    inputEl.innerText = "";
})

equalsEl.addEventListener("click", () => {
    
    calculate(lastOperator);
    inputEl.innerText = result;
    num = '';
    NewNum = true;
})

function calculate(operator){
    switch(operator){
        case '+':
            result += floatNum;      
            break;
        case '-':
            result -= floatNum;      
            break;
        case 'x':
            result *= floatNum;      
            break;
        default:
            result /= floatNum;
    }
}