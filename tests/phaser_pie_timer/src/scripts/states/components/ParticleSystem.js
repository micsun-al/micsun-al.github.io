export default class {
	constructor(game, radius = 100, distance = 30, particlesMax = 2000, sprites = ['shared/particle_0', 'shared/particle_1']){
        this.radius = radius
        this.distance = distance
        this.particlesMax = particlesMax
        this.sprites = sprites

        this.poolParticles()
    }

    poolParticles(){
        this.particlesPool = []
        let particlesGroup = game.add.group()
        this.particleSpawnCircle = new Phaser.Circle(0, 0, this.radius)
    
        for(let i = 0; i < this.particlesMax; i++){
            let particle = game.add.sprite(0, 0, game.data.sheet.spritesheet, game.rnd.pick(this.sprites))

            particle.anchor.set(0.5)
            particle.blendMode = 1
            particle.alpha = 0
            particle.scale.set(game.rnd.realInRange(0.3, 0.5))
            this.particlesPool.push(particle)
            particlesGroup.add(particle)
        }
    }
    
    requestBurst(x, y, count = 200){
        if(!game.device.desktop){
            return
        }

        for(let i = 0; i < count; i++){
            if(this.particlesPool.length <= 0){
                return
            }
    
            let p = this.particlesPool.splice(0, 1)[0]
            let period = game.rnd.between(300, 700)

            this.particleSpawnCircle.random(p)
            p.x += x
            p.y += y
            p.alpha = 0

            game.add.tween(p).to({x: p.x + game.rnd.realInRange(-this.distance, this.distance), y: p.y + game.rnd.realInRange(-this.distance, this.distance)},
                period, Phaser.Easing.Quadratic.Out, true)
            game.add.tween(p).to({angle: game.rnd.realInRange(-1024, 1024)}, period, Phaser.Easing.Linear.None, true)
            game.add.tween(p)
                .to({alpha: 1}, period * 0.3, Phaser.Easing.Quadratic.Out)
                .to({alpha: 0}, period * 0.5, Phaser.Easing.Linear.None, true, period * 0.2)
                .onComplete.add(p => {this.particlesPool.push(p)})
        }
    }
}
