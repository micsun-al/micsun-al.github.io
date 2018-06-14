import Phaser from 'phaser'
import PieTimer from './PieTimer';

export default class extends Phaser.State{
	preload(){
	}

	create(){
		game.time.events.add(Phaser.Timer.SECOND, this.delayedStart, this)

		this.color = {
			r: 0,
			g: 0,
			b: 0
		}

		game.add.tween(this.color).to({r: 255}, 5000, Phaser.Easing.Linear.None, true, 0, -1, true)
		game.add.tween(this.color).to({g: 255}, 30000, Phaser.Easing.Linear.None, true, 0, -1, true)
		game.add.tween(this.color).to({b: 255}, 180000, Phaser.Easing.Linear.None, true, 0, -1, true)
	}

	update(){
		this.animateColor()
	}

	animateColor(){
		document.body.style.backgroundColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
	}

	fullColorHex(r, g, b) {
		var red = this.rgbToHex(r)
		var green = this.rgbToHex(g)
		var blue = this.rgbToHex(b)
		return red + green + blue
	}

	rgbToHex(rgb) { 
		var hex = Number(rgb).toString(16)

		if(hex.length < 2){
			 hex = "0" + hex
		}

		return hex
	}
	
	delayedStart(){
		this.initBackground()
	}

	initBackground(){
		this.bg = game.add.group()
		this.bg.add(new PieTimer(game))
	}

	shutdown(){
		game.world.remove(game.overlay)
	}

	handleOnFocus(){
		if(!game.sound || !game.data.storage){
			return
		}

		game.sound.mute = localStorage.getItem(game.data.storage.mute) === 'true'
	}
	
	handleOnBlur(){
		game.sound.mute = true
	}

	handleMuteClicked(e, pointer, releasedOnButton) {
		if (!releasedOnButton) {
			return
		}
	}
}
