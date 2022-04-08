//sprite
class Sprite {

    constructor({ position, imgSrc, scale = 1, frameMax = 1, offSet = {x:0, y:0}}) {

        this.img = new Image()
        this.img.src = imgSrc
        this.height = 150
        this.width = 50
        this.position = position
        this.scale = scale
        this.frameMax = frameMax
        this.frameCurrent = 0
        this.frameElapse = 0
        this.frameHold = 5 // velociadade troca de frames
        this.offSet = offSet

    }

    draw() {

        context.drawImage(
            this.img,
            this.frameCurrent * (this.img.width / this.frameMax),
            0,
            this.img.width / this.frameMax,
            this.img.height,
            this.position.x - this.offSet.x,
            this.position.y - this.offSet.y,
            (this.img.width / this.frameMax) * this.scale,
            this.img.height * this.scale
        )

    }

    animateFrame() {

        this.frameElapse++

        if (this.frameElapse % this.frameHold === 0) {

            if (this.frameCurrent < this.frameMax - 1) {

                this.frameCurrent++
                setTimeout(14000)

            } else {

                this.frameCurrent = 0

            }
        
        }

    }

    update() {

        this.draw()
        this.animateFrame()

    }

}

//sprite jogadores
class Fighter extends Sprite {

    constructor({
        position,
        velocity,
        color = 'red',
        imgSrc,
        scale = 1,
        frameMax = 1,
        offSet = {x:0, y:0},
        sprites,
        attackBox = { offset: {}, width : undefined, height : undefined }
    }) {

        super({
            position,
            imgSrc,
            scale,
            frameMax,
            offSet
        })
        this.color = color
        this.height = 150
        this.width = 50
        this.lastkey
        this.velocity = velocity
        this.life = 100
        this.attacking
        this.attackBox = {
            
            position: {
                x : this.position.x,
                y : this.position.y
            },
            offSet: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,

        }
        this.frameCurrent = 0
        this.frameElapse = 0
        this.frameHold = 5 // velociadade troca de frames
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {

            sprites[sprite].img = new Image()
            sprites[sprite].img.src = sprites[sprite].imgSrc

        }

    }


    update() {

        this.draw()
        if (!this.dead) this.animateFrame()

        this.attackBox.position.x = this.position.x + this.attackBox.offSet.x
        this.attackBox.position.y = this.position.y + this.attackBox.offSet.y

        //desenhar caixa de ataque
        //context.fillRect(
        //    this.attackBox.position.x, 
        //    this.attackBox.position.y, 
        //    this.attackBox.width, 
        //    this.attackBox.height
        //    )

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //função de gravidade
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            
            this.velocity.y = 0
            this.position.y = 330

        } else this.velocity.y += gravity

    }

    attack() {

        this.switchSprite('attack1')
        this.attacking = true
        
    }

    takeHit() {

        this.life -= 20

        if (this.life <= 0) {

            this.switchSprite('death')

        } else {

            this.switchSprite('takeHit')

        }

    }

    switchSprite(sprite) {

        if (this.img === this.sprites.death.img) {
            
            if (this.frameCurrent === this.sprites.death.frameMax - 1) 
                this.dead = true
            return

        }

        //priorizar animação de ataque
        if (

            this.img === this.sprites.attack1.img && 
            this.frameCurrent < this.sprites.attack1.frameMax -1

        ) 
            return

        //priorizar animação de tomar dano
        if (

            this.img === this.sprites.takeHit.img && 
            this.frameCurrent < this.sprites.takeHit.frameMax -1

        )

            return

        switch(sprite) {

            case 'idle':

                if (this.img !== this.sprites.idle.img){

                this.img = this.sprites.idle.img
                this.frameMax = this.sprites.idle.frameMax
                this.frameCurrent = 0

                }
                break

            case 'run':

                if (this.img !== this.sprites.run.img){

                this.img = this.sprites.run.img
                this.frameMax = this.sprites.run.frameMax
                this.frameCurrent = 0

                }
                break

            case 'jump':

                if (this.img !== this.sprites.jump.img){

                this.img = this.sprites.jump.img
                this.frameMax = this.sprites.jump.frameMax
                this.frameCurrent = 0

                }
                break
            
            case 'fall':

                if (this.img !== this.sprites.fall.img){

                this.img = this.sprites.fall.img
                this.frameMax = this.sprites.fall.frameMax
                this.frameCurrent = 0

                }
                break
                
            case 'attack1':

                if (this.img !== this.sprites.attack1.img){

                this.img = this.sprites.attack1.img
                this.frameMax = this.sprites.attack1.frameMax
                this.frameCurrent = 0

                }
                break

            case 'takeHit':

                if (this.img !== this.sprites.takeHit.img){

                this.img = this.sprites.takeHit.img
                this.frameMax = this.sprites.takeHit.frameMax
                this.frameCurrent = 0

                }
                break

            case 'death':

                if (this.img !== this.sprites.death.img){

                this.img = this.sprites.death.img
                this.frameMax = this.sprites.death.frameMax
                this.frameCurrent = 0

                }
                break

        }
        
    }

}