export default class extends Phaser.Group{
    constructor(game){
		super(game)
		let bg = this.createBg()
		this.blue = this.makeRainbowMask()
		this.yellow = this.makeRainbowMask()
		this.red = this.makeRainbowMask()
		const b = game.make.sprite(0, 0, game.data.sheet.loader, 'blue')
		const y = game.make.sprite(0, 0, game.data.sheet.loader, 'yellow')
		const r = game.make.sprite(0, 0, game.data.sheet.loader, 'red')
		b.mask = this.blue
		y.mask = this.yellow
		r.mask = this.red
		game.utils.anchorAll([b, y, r], 0.5, 1)
		game.utils.scaleAll([bg, b, y, r])
        game.utils.groupAdd(this, [bg, b, y, r, this.blue, this.yellow, this.red])
        this.value = 0
        this.valueTarget = 0
    }

    update(){
        this.blue.angle   = ~~((this.blueAngle   * 2 + this.blue.angle   * 11) / 13) * (1/180 + 1)
        this.yellow.angle = ~~((this.yellowAngle * 2 + this.yellow.angle * 11) / 13) * (1/180 + 1)
        this.red.angle    = ~~((this.redAngle    * 2 + this.red.angle    * 11) / 13) * (1/180 + 1)
        this.value = (this.value * 16 + this.valueTarget) / 17
		document.body.style.backgroundColor = Phaser.Color.getWebRGB(Phaser.Color.linear('0x9ce4f2', '0xdddddd', Math.min(1, this.value)))
	}
	
	createBg(){
		const bg = game.make.sprite(0, 0, this.game.data.sheet.loader, 'bg')
		bg.anchor.set(0.5)
		return bg
	}

	makeRainbowMask(){
		const mask = game.make.graphics(0, -148)
		mask.beginFill(0xffffff)
		mask.drawRect(-300, 0, 600, 600)
		mask.endFill()
		return mask
    }
    
    set(value){
        this.valueTarget = value / 100
		this.blueAngle = ~~(Math.max(0, Math.min(1/3, value / 90)) * 180 * 3)
		this.yellowAngle = ~~(Math.max(0, Math.min(1/3, (value - 30) / 90)) * 180 * 3)
        this.redAngle = ~~(Math.max(0, Math.min(1/3, (value - 60) / 90)) * 180 * 3)
    }
}
