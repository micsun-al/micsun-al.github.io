import IntroState from '../intro/IntroState'

export default class extends Phaser.State {
	preload() {
        this.load.image('circleTimerImage', 'assets/sprites/game_timer_circle_00095.png')
        this.load.image('whiteFlash', 'assets/sprites/white_flash.png')
		this.initStates()
		game.canvas.style.opacity = 1
	}

	create() {
		document.body.style.backgroundColor = '#696969'
		game.state.start('Intro')
	}

	initStates() {
		this.state.add('Intro', IntroState, false)
	}
}
