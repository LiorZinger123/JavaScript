const c = document.getElementById("canvas");
const ctx = c.getContext('2d');
const start = document.getElementById("start");
const score = document.getElementById("score");

function getRandomInt(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

class Snake {
    constructor(){
        this.score = 0;
        this.size = 10;
        this.pos = [[getRandomInt(0, (c.clientWidth - this.size) / 10) * 10, getRandomInt(0, (c.clientHeight - this.size) / 10) * 10]];
        this.move_size = 10;
        this.direction = "";
    }
    move(){
        let newPos = JSON.parse(JSON.stringify(this.pos));
        let head = newPos[0];
        if(this.direction === "UP")
            head[1] -= this.move_size;
        if(this.direction === "DOWN")
            head[1] += this.move_size;
        if(this.direction === "RIGHT")
            head[0] += this.move_size;
        if(this.direction === "LEFT")
            head[0] -= this.move_size;
        this.pos.unshift(head);
    }
    outOfBoard(){
        for(let pos of this.pos){
            if(pos[0] === -this.size || pos[0] === c.clientWidth)
                return true;
            if(pos[1] === -this.size || pos[1] === c.clientHeight)
                return true;
        }
        return false;
    }
    checkIfEat(apple){
        if(this.pos[0][0] === apple.x && this.pos[0][1] === apple.y){
            this.score++;
            do{
                apple.changePos();
            }while(apple.checkLocation(s))
        }
        else
            this.pos.pop();
    }
    draw(){
        for(let i=0; i < this.pos.length; i++){
            ctx.fillStyle = '#0000FF';
            ctx.fillRect(this.pos[i][0], this.pos[i][1], this.size, this.size);
        }
    }
    die(){
        for(let i=1; i < this.pos.length; i++){
            if(this.pos[0][0] === this.pos[i][0] && this.pos[0][1] === this.pos[i][1])
                return true;
        }
        return false;
    }
}

class Apple{
    constructor(){
        this.x = null;
        this.y = null;
        this.size = 10;
    }
    draw(){
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    changePos(){
        this.x = getRandomInt(s.size, (c.clientWidth - s.size * 2) / 10) * 10;
        this.y = getRandomInt(s.size, (c.clientHeight - s.size * 2) / 10) * 10;
    }
    checkLocation(snake){
        for(let pos of snake.pos){
            if(pos[0] === this.x && pos[1] === this.y)
                return true;
        }
        return false;
    }
}

document.addEventListener("keydown", (event) => {
    if(started){
        switch(event.key){
            case "ArrowDown":
                if(s.direction != "UP")
                    s.direction = "DOWN";
                break;
            case "ArrowUp":
                if(s.direction != "DOWN")
                    s.direction = "UP";
                break;
            case "ArrowRight":
                if(s.direction != "LEFT")
                    s.direction = "RIGHT";
                break;
            case "ArrowLeft":
                if(s.direction != "RIGHT")
                    s.direction = "LEFT";
                break;
            default:
                break;
        }
    }
})

let s = new Snake();
let a = new Apple();
let started = false;
let id = null;

function erase(){
    ctx.fillStyle = '#7CFC00';
    ctx.fillRect(0, 0, c.clientWidth, c.clientHeight);
}

function printScreen(){
    erase();
    s.draw();
    a.draw();
    score.textContent = `SCORE: ${s.score}`;
}

start.addEventListener("click", () => {
    if(!started){
        started = true;
    }
    else{
        erase();
        s = new Snake();
        a = new Apple();
        msg.textContent = null;
        clearInterval(id);
    }
    a.changePos();
    id = setInterval(startGame, 70);
    startGame();
})

function startGame(){
    printScreen();
    s.move();
    s.checkIfEat(a);
    if(s.die() || s.outOfBoard())
        clearInterval(id);
}