const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 21,
    },
    actions: {
        timerId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function addListenerHitBox() {
    setTimeout(() => { start();}, 100 );  
    
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    });
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function startSound() {
    let audio = new Audio("./src/audios/start.mp3");
    audio.volume = 1;
    audio.play();
}

function overSound() {
    let audio = new Audio("./src/audios/gameover.mp3");
    audio.volume = 1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function countDown() {  
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
       
    if (state.values.curretTime <= 0) {
        overSound();        
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        clearInterval(state.values.result);
        setTimeout(() => { alert('*** GAME OVER *** \n\n O seu resultado foi: ' + state.values.result);}, 100 );  
        setTimeout(() => { location.reload();}, 100 );                   
    }  
}

function start() {
    alert('BEM VINDO AO DETONA RALPH \n\n Clique em OK para iniciar o jogo!');
    startSound();
}

function initialize() {
    addListenerHitBox();
}

initialize();