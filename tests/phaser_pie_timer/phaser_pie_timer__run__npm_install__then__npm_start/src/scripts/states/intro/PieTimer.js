export default class extends Phaser.Group{
    constructor(game){
        super(game)
        this.w = 376
        this.h = 370
        this.duration = 10000
        this.delay = 1000
        this.pieMask = game.add.graphics(0, 0)
        this.pieMask.lineStyle(0)
        this.pieBg = game.make.sprite(game.world.centerX, game.world.centerY, 'circleTimerImage')
        this.pieBg.anchor.set(0.5)
        this.pieBg.alpha = 0.35
        this.add(this.pieBg)
        this.pieFg = game.make.sprite(game.world.centerX, game.world.centerY, 'circleTimerImage')
        this.pieFg.anchor.set(0.5)
        this.add(this.pieFg)
        this.whiteFlash = game.add.sprite(game.world.centerX, game.world.centerY, 'whiteFlash')
        this.whiteFlash.anchor.set(0.5)
        this.add(this.whiteFlash)
        this.scalar = 0
        game.add.tween(this)
            .to({scalar: 1}, this.duration, Phaser.Easing.Linear.NONE, true, this.delay, -1)
        this.add(this.pieMask)
        this.pieFg.mask = this.whiteFlash.mask = this.pieMask
        this.startFlashAnimation()
    }

    update(){
        this.setProgress(this.scalar)
    }

    setProgress(value){
        this.pieMask.clear()
        this.pieMask.beginFill(0xFFFFFF)
        this.pieMask.lineStyle(0)
        this.pieMask.moveTo(this.w * 0.51, this.h * 0.5)
        this.pieMask.lineTo(this.w * 0.51, this.h * 0.5)
        this.pieMask.arc(this.w * 0.51, this.h * 0.5, this.h * 0.5,
            Math.PI * -0.5, Math.PI * -0.5 + this.scalar * Math.PI * 2)
        this.pieMask.lineTo(this.w * 0.5, this.h * 0.5)
        this.pieMask.endFill()
    }

    startFlashAnimation(){
        game.add.tween(this.whiteFlash)
            .to({alpha: [
                0, 0, 0, 0, 0, 0.5,
                0, 0, 0, 0, 0, 0.5,
                0, 0, 0, 0, 0, 0.5,
                0, 0, 0, 0, 0, 0.5,
                0, 0, 0, 0, 0, 0.6,
                0, 0, 0, 0, 0, 0.6,
                0, 0, 0, 0, 0, 0.6,
                0, 0, 0, 0, 0, 0.6,
                0, 0, 0.7, 0, 0, 0.7,
                0, 0, 0.7, 0, 0, 0.7,
                0, 0, 0.7, 0, 0, 0.7,
                0, 0, 0.7, 0, 0, 0.7,
                0, 0.8, 0, 0.8, 0, 0.8,
                0, 0.8, 0, 0.8, 0, 0.8,
                0, 0.8, 0, 0.8, 0, 0.8,
                0, 0.9, 0, 0.9, 0, 0.9, 0]
            }, this.duration, Phaser.Easing.Linear.None, true, this.delay, -1)
    }
}
