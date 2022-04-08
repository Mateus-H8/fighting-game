//função que detecta caixa de colisão dos ataques
function boxCollision({box1, box2}) {

    return(
        box1.attackBox.position.x + box1.attackBox.width >= box2.position.x && 
        box1.attackBox.position.x <= box2.position.x + box2.width && 
        box1.attackBox.position.y + box1.attackBox.height >= box2.position.y && 
        box1.attackBox.position.y <= box2.position.y + box2.height
        )

}

//definir vencedor
function determineWinner({player1, player2, timerId}) {
    
    clearTimeout(timerId)
    document.querySelector('#displayResult').style.display = 'flex'

    //mensagem de fim de partida
    if (player1.life === player2.life) {

        document.querySelector('#displayResult').innerHTML = 'Empate'

    }else if (player1.life > player2.life) {

        document.querySelector('#displayResult').innerHTML = 'Player 1 Wins!'

    }else {

        document.querySelector('#displayResult').innerHTML = 'Player 2 Wins!'

    }

}

//Timer da partida
let timer = 60
let timerId
function gameTimer() {

    timerId = setTimeout(gameTimer, 1000)
    if (timer > 0) {
        
        timer--
        document.querySelector('#gameTimer').innerHTML = timer
    
    }

    if (timer === 0) {

        determineWinner({player1, player2, timerId})

    }

}