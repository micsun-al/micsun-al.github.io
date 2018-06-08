var StateLoading = function(game){};
StateLoading.prototype = {
	preload: function(){
		game.track.screen('loading');
		this.startTime = game.time.time;
		game.add.existing(loading);
		game.load.json('data', 'assets/data/data.json');
		game.load.json('spreadsheet_data', 'assets/data/spreadsheet_data.json');
		game.load.atlasJSONHash('spritesheet4', 'assets/spritesheets/spritesheet4.png', 'assets/spritesheets/spritesheet4.json');
//		game.load.atlasJSONHash('collectionsheet4', 'assets/spritesheets/collectionsheet4.png', 'assets/spritesheets/collectionsheet4.json');
		game.load.atlasJSONHash('introsheet4', 'assets/spritesheets/introsheet4.png', 'assets/spritesheets/introsheet4.json');
	},
	shutdown: function(){
		game.world.remove(overlay);
	},
	loadUpdate: function(){
		// TODO
	},
	create: function(){
		game.world.remove(loading);
		game.sounds.soundtrack.loop = true;
		game.sounds.soundtrack.play();

		game.settings = function(){
			var maxLevel = localStorage.getItem('match3_max_level') !== null ? parseInt(localStorage.getItem('match3_max_level')) : 0;
			game.sound.volume = localStorage.getItem('match3_volume') !== null ? parseFloat(localStorage.getItem('match3_volume')) : 0.5;
			game.sound.mute = localStorage.getItem('match3_mute') !== null ? localStorage.getItem('match3_mute') === 'true' : false;
			game.sounds.soundtrack.volume = localStorage.getItem('match3_music_volume') !== null ? parseFloat(localStorage.getItem('match3_music_volume')) : 0.25;

			return{
				getMusicVolume: function(){
					return game.sound.musicVolume;
				}.bind(this),
				setMusicVolume: function(value){
					localStorage.setItem('match3_music_volume', value);
					game.sounds.soundtrack.volume = value;
				}.bind(this),
				getVolume: function(){
					return game.sound.volume;
				}.bind(this),
				setVolume: function(value){
					localStorage.setItem('match3_volume', value);
					game.sound.volume = value;
				}.bind(this),
				getMute: function(){
					return game.sound.mute;
				}.bind(this),
				setMute: function(value){
					localStorage.setItem('match3_mute', value);
					game.sound.mute = value;
					if(value === true){
						this.muteBtn.setFrames('shared/mute_over', 'shared/mute_up', 'shared/mute_down', 'shared/mute_up');
					}else{
						this.muteBtn.setFrames('shared/unmute_over', 'shared/unmute_up', 'shared/unmute_down', 'shared/unmute_up');
					}
				}.bind(this),
				getMaxLevel: function(){
					return maxLevel;
				}.bind(this),
				setMaxLevel: function(value){
					maxLevel = value;
					localStorage.setItem('match3_max_level', value);
				}.bind(this),
				hasCollected: function(item){
					return game.settings.getCollected.call(this, item) > 0;
				}.bind(this),
				getCollected: function(item){
					var value = parseInt(localStorage.getItem(item), 10);
					return isNaN(value) ? 0 : value;
				}.bind(this),
				addCollected: function(item, count){
					count = (typeof count === 'undefined' || isNaN(count)) ? 1 : count;
					var previous = parseInt(localStorage.getItem(item), 10);
					localStorage.setItem(item, (isNaN(previous) ? 0 : previous) + count);
				}.bind(this),
				setCollected: function(item, count){
					localStorage.setItem(item, count);
				}.bind(this)
			}
		}.call(this);
		jsonData = game.cache.getJSON('data');
		var spreadsheetData = game.cache.getJSON('spreadsheet_data');
		for(var property in spreadsheetData){
			jsonData[property] = spreadsheetData[property];
		}
		currentLevelIndex = 0;
		overlay = game.add.sprite();
		this.muteBtn = game.make.button(41, 41, jsonData.sheet.game, this.handleMuteClicked, this);
		this.muteBtn.anchor.setTo(0.5);
		this.addOverScaling.call(this, this.muteBtn);
		game.settings.setMute.call(this, game.settings.getMute());	// Initializes mute control state - msunwoo
		overlay.addChild(this.muteBtn);
		game.state.add('Intro', StateIntro);
		game.state.add('LevelSelect', StateLevelSelect);
		game.state.add('Collection', StateCollection);
		game.state.add('Game', StateGame);
		game.state.start('Intro');
		var border = game.add.graphics(0, 0);
		border.lineStyle(10, 0xEB3B80, 1);
		border.drawRect(5, 5, 950, 710);
		this.muteBtn.setSounds(game.sounds.over, null, game.sounds.click);
		game.track.timing('state', 'init', game.time.time - this.startTime, 'loading');
		currentLevelIndex = game.settings.getMaxLevel();
	},
	addOverScaling: function(target){
		if(Array.isArray(target)){
			target.forEach(overScaling, this);
		}else{
			overScaling(target);
		}
		function overScaling(target){
			var negativeX = target.scale.x < 0 ? -1 : 1,
				negativeY = target.scale.y < 0 ? -1 : 1;
			target.onInputOver.add(function(){
				game.add.tween(target.scale).to({ x: 1.05 * negativeX, y: 1.05 * negativeY }, 400, Phaser.Easing.Back.Out, true);
			}, this);
			target.onInputOut.add(function(){
				game.add.tween(target.scale).to({ x: 1 * negativeX, y: 1 * negativeY }, 200, Phaser.Easing.Quadratic.InOut, true);
			}, this);
		}
	},
	handleMuteClicked: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		game.settings.setMute.call(this, !game.settings.getMute());
		game.track.event('mute', 'click', game.settings.getMute() ? 'mute' : 'unmute');
	}
}