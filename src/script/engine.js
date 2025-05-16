const state = {
        view: {
            square: document.querySelectorAll(".square"),
            enemy: document.querySelector(".enemy"),
            timeLeft: document.querySelector("#time-left"),
            score: document.querySelector("#score"),
            livesLeft: document.querySelector("#lives-left")
        },
        values: {
            gameVelocity: 1000,
            hitPosition: 0,
            result: 0,
            currentTime: 60,
            currentLives: 3
        },
        action:{
            timerId: setInterval(randomSquare, 1000),
            countDownTimrId: setInterval(countDown, 1000),
        }
};

function randomSquare() {
    state.view.square.forEach((square) =>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;
}

// function moveEnemy() {
//     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
// }

function addListenerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
            else{
                countLives()
            }
        })
    });
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.action.countDownTimrId);
        clearInterval(state.action.timerId);
        alert("O tempo acabou! O seu resultado foi:" + state.values.result);
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.wav");
    audio.volume = 0.2;
    audio.play();
}

function countLives() {
    state.values.currentLives--;
    state.view.livesLeft.textContent = state.values.currentLives;

     if(state.values.currentLives <= 0){
        clearInterval(state.action.countDownTimrId);
        clearInterval(state.action.timerId);
        clearInterval(state.values.currentLives);
        alert("Game Over! O seu resultado foi:" + state.values.result);
    }
}

function init() {
    // moveEnemy();
    addListenerHitBox();
}


init();