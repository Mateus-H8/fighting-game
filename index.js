const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d'); // canvas context

canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.8  //velociadade da gravidade

//background
const background = new Sprite({

    position: {
        x:0,
        y:0
    },
    imgSrc: './assets/background.png'

})

const shop = new Sprite({

    position: {
        x:620,
        y:128
    },
    imgSrc: './assets/shop.png',
    scale: 2.75,
    frameMax: 6

})

//posição inicial player 1
const player1 = new Fighter({ 

    position : {
        x : 0,
        y : 0
    },

    velocity : {
        x : 0,
        y : 0
    },

    offSet : {
        x : 0,
        y : 0
    },

    imgSrc : './assets/samuraiMack/Idle.png',
    frameMax: 8,
    scale: 2.5,
    offSet : {
        x : 215,
        y : 156
    },

    sprites : {

        idle : {

            imgSrc : './assets/samuraiMack/Idle.png',
            frameMax : 8

        },

        run : {

            imgSrc : './assets/samuraiMack/Run.png',
            frameMax : 8
        },

        jump : {

            imgSrc : './assets/samuraiMack/Jump.png',
            frameMax : 2

        },

        fall : {

            imgSrc : './assets/samuraiMack/Fall.png',
            frameMax : 2

        },

        attack1 : {

            imgSrc : './assets/samuraiMack/Attack1.png',
            frameMax : 6

        },

        takeHit : {

            imgSrc : './assets/samuraiMack/Take hit.png',
            frameMax : 4

        },

        death : {

            imgSrc : './assets/samuraiMack/Death.png',
            frameMax : 6

        }

    },

    attackBox : {

        offset: {

            x:100,
            y:50

        },
        width: 150,
        height: 50

    }

})

//posição inicial player 2
const player2 = new Fighter({

    position : {
        x : 400,
        y : 100
    },

    velocity : {
        x : 0,
        y : 0
    },

    offSet : {
        x : -50,
        y : 0
    },

    imgSrc : './assets/kenji/Idle.png',
    frameMax: 4,
    scale: 2.5,
    offSet : {
        x : 215,
        y : 170
    },

    sprites : {

        idle : {

            imgSrc : './assets/kenji/Idle.png',
            frameMax : 4

        },

        run : {

            imgSrc : './assets/kenji/Run.png',
            frameMax : 8,

        },

        jump : {

            imgSrc : './assets/kenji/Jump.png',
            frameMax : 2,

        },

        fall : {

            imgSrc : './assets/kenji/Fall.png',
            frameMax : 2,

        },

        attack1 : {

            imgSrc : './assets/kenji/Attack1.png',
            frameMax : 4,

        },

        takeHit : {

            imgSrc : './assets/kenji/Take hit.png',
            frameMax : 3


        },

        death : {

            imgSrc : './assets/kenji/Death.png',
            frameMax : 7

        }

    },

    attackBox : {

        offset: {

            x : -170,
            y : 50

        },
        width: 170,
        height: 50

    }

})

//teclas de controle, caso altere tbm deve alterar em "animate()" e na área de movimentação
const keys = {

    a: {
        pressed : false
    },

    d: {
        pressed : false
    },

    ArrowLeft: {
        pressed : false
    },

    ArrowRight: {
        pressed : false
    }

}

gameTimer()

//animação
function animate () {

    window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player1.update()
    player2.update()

    player1.velocity.x = 0
    player2.velocity.x = 0

    //movimentação player 1
        if (keys.a.pressed && player1.lastkey === 'a') {

        player1.velocity.x = -5
        player1.switchSprite('run')

    } else if (keys.d.pressed && player1.lastkey === 'd') {

        player1.velocity.x = 5
        player1.switchSprite('run')

    } else{

        player1.switchSprite('idle')

    }

    //player 1 pulando e caindo
    if (player1.velocity.y < 0) {

        player1.switchSprite('jump')

    }else if (player1.velocity.y > 0) {

        player1.switchSprite('fall')

    }

    //movimentação player 2
    if (keys.ArrowLeft.pressed && player2.lastkey === 'ArrowLeft') {

        player2.velocity.x = -5
        player2.switchSprite('run')

    } else if (keys.ArrowRight.pressed && player2.lastkey === 'ArrowRight') {

        player2.velocity.x = 5
        player2.switchSprite('run')

    } else{

        player2.switchSprite('idle')

    }

    //player 2 pulando e caindo
    if (player2.velocity.y < 0) {

        player2.switchSprite('jump')

    }else if (player2.velocity.y > 0) {

        player2.switchSprite('fall')

    }

    //detectar ataque player 1
    if (boxCollision({

        box1 : player1,
        box2 : player2

    }) &&

    player1.attacking && player1.frameCurrent === 4

    ) {

            player2.takeHit()
            player1.attacking = false
            document.querySelector('#player2Life').style.width = player2.life + '%'

    }

    if (player1.attacking && player1.frameCurrent === 4) {

        player1.attacking = false

    }

    //detectar ataque player 2
    if (boxCollision({

        box1 : player2,
        box2 : player1

    }) &&

    player2.attacking && player2.frameCurrent === 2

    ) {

            player1.takeHit()
            player2.attacking = false
            document.querySelector('#player1Life').style.width = player1.life + '%'

    }

    if (player2.attacking && player2.frameCurrent === 2) {

        player2.attacking = false

    }

    //fim da vida dos jogadores
    if (player1.life <= 0 || player2.life <= 0) {

        determineWinner({player1, player2, timerId})

    }
}

animate()

// controle dos jogadores
window.addEventListener('keydown', (event) => {

    if (!player1.dead) {
        
        switch (event.key) {

            //mover para esquerda player 1
            case 'a':
                keys.a.pressed = true
                player1.lastkey = 'a'
                break

            //mover para direita player 1
            case 'd':
                keys.d.pressed = true
                player1.lastkey = 'd'
                break
            
            //Pular player 1
            case 'w':
                player1.velocity.y = -20
                break
            
            //Ataque player 1
            case ' ': //barra de espaço
                player1.attack()
                break
        }
    }

    if (!player2.dead) {

        switch (event.key) {
        
            //mover para esquerda player 2
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                player2.lastkey = 'ArrowLeft'
                break

            //mover para direita player 2
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                player2.lastkey = 'ArrowRight'
                break
            
            //Pular player 2
            case 'ArrowUp':
                player2.velocity.y = -20
                break
            
            //ataque player 2
            case 'ArrowDown':
                player2.attack()
                break
            
        }

    }

})

// parar movimentação dos jogadores
window.addEventListener('keyup', (event) => {

    //player 1
    switch (event.key) {
        
        case 'a':
            keys.a.pressed = false
            break
        
        case 'd':
            keys.d.pressed = false
            break

    }

    //player 2
    switch (event.key) {
        
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break

    }

})