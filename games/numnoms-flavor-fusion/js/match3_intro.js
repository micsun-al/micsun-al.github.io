var StateIntro = function(game){};
StateIntro.prototype = {
	preload: function(){
		game.track.screen('intro');
		this.startTime = game.time.time;
		game.load.bitmapFont('brady_bunch_remastered', 'assets/fonts/brady_bunch_remastered.png', 'assets/fonts/brady_bunch_remastered.fnt');
		game.add.existing(loading);
	},
	create: function(){
		game.world.remove(loading);
		this.bg = game.add.sprite(game.world.centerX, game.world.centerY, jsonData.sheet.intro, 'state_intro/game_bg');

		var border = game.add.graphics(0, 0);
		border.lineStyle(10, 0xEB3B80, 1);
		border.drawRect(5, 5, 950, 710);
		
		this.text = game.add.sprite(game.world.centerX, game.world.centerY, jsonData.sheet.intro, 'state_intro/intro_text');
		this.text.anchor.setTo(0.5);
		this.nums = game.add.sprite(game.world.centerX, game.world.centerY, jsonData.sheet.intro, 'state_intro/intro_nums');
		this.logo = game.add.sprite(game.world.centerX, game.world.centerY * 0.6, jsonData.sheet.intro, 'state_intro/intro_logo');
		this.logo.anchor.setTo(0.5, 0.3);
		this.button = game.add.button(486, 619, jsonData.sheet.intro, this.handleIntroPlayNowClick, this,
			'state_intro/intro_play_over', 'state_intro/intro_play_up', 'state_intro/intro_play_down', 'state_intro/intro_play_up');
		this.button.setSounds(game.sounds.over, null, game.sounds.click);
		this.button.anchor.setTo(0.5);
		this.addOverScaling(this.button);

		this.bg.alpha = this.nums.alpha = this.text.alpha = this.logo.alpha = this.button.alpha = 1;

		this.nums.anchor.setTo(0.5);
		this.bg.anchor.setTo(0.5);

		game.add.tween(this.logo).from({alpha: 0}, 1000, Phaser.Easing.Quadratic.In, true, 0);
		game.add.tween(this.logo).from({y: '-50'}, 1000, Phaser.Easing.Back.Out, true, 0);

		game.add.tween(this.text).from({alpha: 0}, 1000, Phaser.Easing.Quadratic.In, true, 800);
		game.add.tween(this.text).from({y: '+50'}, 1200, Phaser.Easing.Back.Out, true, 800);

		game.add.tween(this.nums.scale).from({x: 1.2, y: 1.2}, 3000, Phaser.Easing.Quintic.Out, true, 0);

		game.add.tween(this.bg).from({alpha: 0}, 500, Phaser.Easing.Quadratic.In, true, 200);
		game.add.tween(this.bg.scale).from({x: 1.2, y: 1.2}, 750, Phaser.Easing.Quadratic.Out, true, 0);

		game.add.tween(this.button).from({alpha: 0}, 1000, Phaser.Easing.Quadratic.In, true, 500);
		game.add.tween(this.button).from({y: '+100'}, 2500, Phaser.Easing.Elastic.Out, true, 500);

		game.add.existing(overlay);
		game.track.timing('state', 'init', game.time.time - this.startTime, 'intro');
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
	shutdown: function(){
		game.world.remove(overlay);
	},
	handleIntroPlayNowClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}

		game.track.event('intro', 'click', 'play_now');
		game.state.start("LevelSelect");
	}
};