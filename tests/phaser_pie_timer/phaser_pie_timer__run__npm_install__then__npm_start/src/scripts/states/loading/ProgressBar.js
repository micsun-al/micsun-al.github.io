import ProgressRainbow from "./ProgressRainbow";

export default class extends Phaser.Group{
    constructor(game, width, height, border){
        super(game)
        this.progressWidth = 1000
		this.progressHeight = 80
		this.progressBorder = 5
		this.progressBarOffset = 80
        this.createProgress()
        game.add.existing(this)
    }

    loadUpdate(load){
		this.progressText.setText(`${~~(Math.min(load.progress / 93, 1) * 100)}%`)
		this.rainbow.set(load.progress)
    }
	
	createProgress(){
		this.progressContainer = game.add.group()
		this.progressContainer.x = game.world.centerX
		this.progressContainer.y = game.world.centerY
		this.rainbow = new ProgressRainbow(game)
		game.utils.groupAdd(this.progressContainer, [this.rainbow, this.createLoadingText(), this.createProgressText()])
	}

	createLoadingText(){
		let text = game.add.text(0, -108, 'Loading', {
			fontSize: '50px',
			fill: '#492f92',
			align: 'center'
        })
        
		text.anchor.setTo(0.5, 0)
		return text
	}

	createProgressText(){
		this.progressText = game.add.text(0, -58, '0%', {
			fontSize: '100px',
			fill: '#492f92',
			align: 'center'
        })
        
		this.progressText.anchor.setTo(0.5, 0)
		return this.progressText
	}
}

