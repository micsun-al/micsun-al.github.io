import 'pixi'
import 'p2'
import Phaser from 'phaser'
import LoadingState from './states/loading/LoadingState'
import config from './config'
import '../../src/styles/main.css'
import '../../favicon.ico'

class MainGame extends Phaser.Game {
	constructor() {
		const isDesktop = !navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)

		super({
			antialias: isDesktop,
			enableDebug: false,
			width: config.gameWidth,
			height: config.gameHeight,
			renderer: Phaser.AUTO,
			parent: 'content',
			transparent: true,
			multiTexture: false,
			preserveDrawingBuffer: false,
			state: {
				preload: function(){
					game.input.maxPointers = 1
					game.load.atlasJSONHash('loader', 'assets/sprites/loader.png', 'assets/sprites/loader.json')
					game.data = {languageCode: 'en', loading: null, score: 0, level: 0}
					this.stage.disableVisibilityChange = isDesktop
					this.scale.pageAlignHorizontally = this.scale.pageAlignVertically = true
					this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
					this.state.add('Loading', LoadingState, false)
				},
				create: function(){
					game.state.start('Loading')
				}
			}
		})

		// with Cordova with need to wait that the device is ready so we will call the Boot state in another file
		// if (!window.cordova) {
		//   this.state.start('Boot')
		// }
	}
}

window.game = new MainGame()

if (window.cordova) {
	var app = {
		initialize: function () {
			document.addEventListener(
				'deviceready',
				this.onDeviceReady.bind(this),
				false
			)
		},

		onDeviceReady: function () {
			this.receivedEvent('deviceready')
			window.game.state.start('Boot')
		},

		receivedEvent: function (id) {
			console.log(`Received Event: ${id}`)
		}
	}

	app.initialize()
}
