var StateGame = function(game){};
StateGame.prototype = {
	preload: function(){
		game.track.screen('game');
		this.startTime = game.time.time;
		game.add.existing(loading);
		this.orbColors = null;
		this.fastFall = true;
		this.gameArray = [];
		this.removeMap = [];
		this.orbGroup = null;
		this.selectedOrb = null;
		this.canPick = true;
		this.arrowLeft = null;
		this.arrowRight = null;
		this.hintTweenA = null;
		this.hintTweenB = null;
		this.maxTileDimension = null;
		this.possibleTypes = null;
		this.suggestionTimeout = null;
		this.menuButton = null;
		this.bg = null;
		this.lastProgressPos = null;
		this.tweenCount = 0;
		this.menu = null;
		this.stack = [];
		this.stackBG = [];
		this.menuGroup = null;
		this.levelData = jsonData.levels[currentLevelIndex];
		this.bitmapDataCache = [];
		this.orbitters = [];
		this.stackMax = 9;
		this.arrowHintAvailable = true;
		var theme = this.levelData.theme;
		game.load.atlasJSONHash(theme, 'assets/spritesheets/' + theme + '.png', 'assets/spritesheets/' + theme + '.json');
		var animationKey = this.levelData.animation,
			animation = jsonData.animations[animationKey];
		game.load.spritesheet(animationKey, 'assets/animations/' + animation.url, animation.w, animation.h, animation.frames);
		game.load.bitmapFont('brady_bunch_remastered', 'assets/fonts/brady_bunch_remastered.png', 'assets/fonts/brady_bunch_remastered.fnt', null, 0, -20);
	},
	create: function(){
		game.world.remove(loading);
		Phaser.ScaleManager.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.initGraphics.call(this);
		this.initButtons.call(this);
		this.initInput.call(this);
		this.initProgress.call(this);
		this.maxTileDimension = Math.max(jsonData.game.icon.w, jsonData.game.icon.h);
		this.initLevel.call(this);
		this.startAnimations.call(this);
		var border = game.add.graphics(0, 0);
		border.lineStyle(10, 0xEB3B80, 1);
		border.drawRect(5, 5, 950, 710);
		game.sounds.begin_level.play();
		game.add.existing(overlay);
		game.track.timing('state', 'init', game.time.time - this.startTime, 'game');
		game.track.event('game', 'start', this.levelData.subtitle);
	},
	shutdown: function(){
		this.progress.destroy();
		this.progress = null;
		this.bitmapDataCache.forEach(function(bmd){
			bmd.destroy();
		}, this);
		this.bitmapDataCache = null;
		game.world.remove(overlay);
	},
	isLevelRandom: function(value){
		if(typeof value === 'undefined'){
			value = currentLevelIndex;
		}
		return (jsonData.levels[value].flags & 0x01);
	},
	isLevelSpecial: function(value){
		if(typeof value === 'undefined'){
			value = currentLevelIndex;
		}
		return (jsonData.levels[value].flags & 0x02);
	},
	isLevelMystery: function(value){
		if(typeof value === 'undefined'){
			value = currentLevelIndex;
		}
		return value >= jsonData.levels.length - 1;
	},
	startAnimations: function(){
		var i, j, sprite;
		this.skin.alpha = 1;

		game.add.tween(this.skin).from({alpha: 0}, 1000, Phaser.Easing.Quadratic.In, true, 0);
		game.add.tween(this.bg.scale).from({x: 1.2, y: 1.2}, 1250, Phaser.Easing.Quadratic.Out, true, 300);

		game.add.tween(this.orbGroup).from({alpha: 0}, 1000, Phaser.Easing.Quadratic.In, true, jsonData.game.fall_speed);
		game.add.tween(this.orbGroup).from({y: "-50"}, 750, Phaser.Easing.Bounce.Out, true, jsonData.game.fall_speed);

		// game.add.tween(this.menuButton).from({alpha: 0}, 1000, Phaser.Easing.Quadratic.In, true, 800);
		game.add.tween(this.menuButton).from({y: '-80'}, 1000, Phaser.Easing.Back.Out, true, 800);

		game.add.tween(this.progress).from({alpha: 0}, 500, Phaser.Easing.Quadratic.In, true, 900);
		game.add.tween(this.progress).from({y: "-50"}, 700, Phaser.Easing.Bounce.Out, true, 900);
		game.add.tween(this.progress.middle).from({alpha: 0}, 500, Phaser.Easing.Quadratic.In, true, 900);
		game.add.tween(this.progress.middle).from({y: "-50"}, 700, Phaser.Easing.Bounce.Out, true, 900);

		game.time.events.add(Phaser.Timer.SECOND * 0.5, function(){
			this.gameIntro = game.add.sprite();
			this.gameIntro.x = game.world.centerX
			this.gameIntro.y = game.world.centerY;
			this.gameIntroBurstWhite = this.gameIntro.addChild(game.make.sprite(0, 0, jsonData.sheet.game, 'state_game/burst_white'));
			this.gameIntroBurstWhite.anchor.setTo(0.5);
			this.gameIntroBurstYellow = this.gameIntro.addChild(game.make.sprite(0, 0, jsonData.sheet.game, 'state_game/burst_yellow'));
			this.gameIntroBurstYellow.anchor.setTo(0.5);
			this.gameIntroText = this.gameIntro.addChild(game.make.sprite(0, 0, jsonData.sheet.game, 
				this.isLevelSpecial.call(this) ? 'state_game/game_intro_last_level' :
				this.isLevelRandom.call(this) ? 'state_game/game_intro' : 'state_game/game_intro_recipe'));
			if(!this.isLevelRandom.call(this) && (currentLevelIndex < 20)) {
				this.recipeInstructions = this.gameIntro.addChild(game.make.sprite(0, 150, jsonData.sheet.game, 'state_game/recipe_instructions'));
				this.recipeInstructions.anchor.setTo(0.5);
				this.recipeInstructions.alpha = 1;
				game.add.tween(this.recipeInstructions)
					.from({alpha: 0}, 500, Phaser.Easing.Quadratic.Out, true, 300);
				game.add.tween(this.recipeInstructions)
					.from({y: "+100"}, 1200, Phaser.Easing.Back.Out, true, 300);
			}
			this.gameIntroText.anchor.setTo(0.5);
			this.gameIntro.alpha = 0;
			this.gameIntro.inputEnabled = true;
			this.gameIntro.events.onInputDown.add(function(target){
				target.inputEnabled = false;
				game.add.tween(target)
					.to({alpha: 0}, 250, Phaser.Easing.Quadratic.In, true)
					.onComplete.add(function(){
						target.destroy();
					}, this);
			});
			game.add.tween(this.gameIntro)
				.to({alpha: 1}, 200, Phaser.Easing.Quadratic.Out, false)
				.to({alpha: 0}, 500, Phaser.Easing.Quadratic.In, false, this.isLevelRandom.call(this) ? 3500 : 5000)
				.start()
				.onComplete.add(function(){
					this.gameIntro.destroy();
				}, this);
			game.add.tween(this.gameIntro.scale).from({x: 0.5, y: 0.5}, this.isLevelRandom.call(this) ? 1000 : 2000, Phaser.Easing.Elastic.Out, true);
			game.add.tween(this.gameIntroBurstWhite.scale).from({x: 0.3, y: 0.5}, this.isLevelRandom.call(this) ? 3400 : 6800, Phaser.Easing.Elastic.Out, true);
			game.add.tween(this.gameIntroBurstYellow.scale).from({x: 0.5, y: 0.3}, this.isLevelRandom.call(this) ? 2800 : 4600, Phaser.Easing.Elastic.Out, true);
			game.add.tween(this.gameIntroBurstWhite).from({angle: game.rnd.between(-90, 90)}, 5700, Phaser.Easing.Linear.None, true);
			game.add.tween(this.gameIntroBurstYellow).from({angle: game.rnd.between(-90, 90)}, 5700, Phaser.Easing.Linear.None, true);
			if(!this.isLevelRandom.call(this))
			{
				this.gameIntroArrow = game.add.sprite(752, 320, jsonData.sheet.game, 'state_game/stack_arrow');
				this.gameIntroArrow.anchor.setTo(0.5, 1);
				this.gameIntroArrow.alpha = 0;
				game.add.tween(this.gameIntroArrow)
					.from({y: '-50'}, 1000, Phaser.Easing.Quintic.Out, true);
				game.add.tween(this.gameIntroArrow.scale)
					.from({y: 1.6}, 1000, Phaser.Easing.Elastic.Out, true, 500);
				game.add.tween(this.gameIntroArrow.scale)
					.from({x: 0.25}, 2000, Phaser.Easing.Elastic.Out, true, 500);
				game.add.tween(this.gameIntroArrow)
					.to({alpha: 1}, 200, Phaser.Easing.Quadratic.Out, false, 500)
					.to({alpha: 0}, 200, Phaser.Easing.Quadratic.In, false, 2000)
					.start()
					.onComplete.add(function(obj, tween){
						this.gameIntroArrow.destroy();
					}, this);
			}
			for(i = 0; i < jsonData.game.rows; i++){
				for(j = 0; j < jsonData.game.columns; j++){
					sprite = this.gemAt(i, j).orbSprite;
					game.add.tween(sprite).from({ 
						y: sprite.y - 80
					}, (jsonData.game.rows - i + 1) * 100 * game.rnd.realInRange(0.8, 1.2), Phaser.Easing.Bounce.Out, true);
				}
			}
		}, this);
	},
	initGraphics: function(){
		var subtitleText;
		this.skin = game.add.group();
		this.bg = game.add.sprite(game.world.centerX, game.world.centerY, jsonData.sheet.intro, 'state_intro/' + this.levelData.bg);
		this.orbGroup = game.add.group();
		this.effectsGroup = game.add.group();
		this.bg.anchor.setTo(0.5);
		this.skin.addChild(this.bg);
		this.skin.addChild(game.add.sprite(0, 0, jsonData.sheet.game, jsonData.game.theme.sprite));
		this.skin.addChild(game.add.sprite(0, 0, this.levelData.theme, jsonData.themes[this.levelData.theme].sign.sprite));
		subtitleText = this.skin.addChild(game.make.bitmapText(
			jsonData.themes[this.levelData.theme].sign.x, 
			jsonData.themes[this.levelData.theme].sign.y - 3, 
			'brady_bunch_remastered', "" + this.levelData.subtitle, 30));
		subtitleText.tint = 0xeb3b80;
		subtitleText.anchor.setTo(0.5);
		game.add.sprite(0, 0, jsonData.sheet.game, 'state_game/game_logo');
		this.reshuffle = game.add.sprite(game.world.centerX, game.world.centerY, jsonData.sheet.game, 'state_game/game_reshuffle');
		this.reshuffle.anchor.setTo(0.4, 0.5);
		this.reshuffle.alpha = 0;
	},
	addOverScaling: function(target){
		if(this.isArray(target)){
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
	initButtons: function(){
		this.menuButton = game.add.button(884, 0, jsonData.sheet.game, this.handleMenuClick, this, 
			'state_game/game_menu_over', 'state_game/game_menu_up', 'state_game/game_menu_down', 'state_game/game_menu_up');
		this.menuButton.setSounds(game.sounds.over, null, game.sounds.click);
		this.menuButton.forceOut = true;
		this.menuButton.anchor.setTo(0.5, 0);
		this.menuButton.onInputOver.add(function(target){
			game.add.tween(target.scale)
				.to({ x: 1.05, y: 1.05 }, 400, Phaser.Easing.Back.Out, true);
		}, this);
		this.menuButton.onInputOut.add(function(target){
			game.add.tween(target.scale)
				.to({ x: 1, y: 1 }, 200, Phaser.Easing.Quadratic.InOut, true);
		}, this);
	},
	handleMenuClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		game.track.event('game', 'click', 'menu_button');
		game.add.tween(this.menuButton.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Quadratic.InOut, true);
		// Workaround for button not resetting when clicking the button and closing the menu and re-hovering over button - msunwoo
		this.menuButton.inputEnabled = false;
		this.menuButton.inputEnabled = true;
		this.handleMenuRequested.call(this);
	},
	handleMenuRequested: function(){
		if(this.menuGroup !== null || this.tweenCount > 0){
			return;
		}
		this.canPick = false;
		this.menuGroup = game.add.group();
		var darkenBg = game.make.graphics(0, 0),
			bg = game.make.sprite(480, 360, jsonData.sheet.game, 'summary/menu_bg'),
			decorLeft = game.make.sprite(323, 496, jsonData.sheet.game, 'summary/summary_decor_bottom_left'),
			decorRight = game.make.sprite(647, 215, jsonData.sheet.game, 'summary/summary_decor_top_right'),
			titleText = game.make.bitmapText(485, 275, 'brady_bunch_remastered', jsonData.menu.text.title, 38),
			warningBg = game.make.graphics(0, 50),	// Hack: This is a hitbox thing because the warningText hitbox goes crazy without it - msunwoo
			warningText = game.make.bitmapText(0, 50, 'brady_bunch_remastered', jsonData.menu.text.warning, 19),
			closeButton = game.make.button(700, 167, jsonData.sheet.game, this.handleMenuCloseClick, this,
				'shared/close_over', 'shared/close_up', 'shared/close_down', 'shared/close_up'),
			nextLevelButton = game.make.button(492, 359, jsonData.sheet.game, this.handleMenuNextLevelClick, this,
				'shared/next_level_over', 'shared/next_level_up', 'shared/next_level_down', 'shared/next_level_up'),
			backToMapButton = game.make.button(492, 445, jsonData.sheet.game, this.handleMenuBackToMapClick, this,
				'shared/back_to_map_over', 'shared/back_to_map_up', 'shared/back_to_map_down', 'shared/back_to_map_up');
		this.addOverScaling([backToMapButton, nextLevelButton, closeButton]);
		darkenBg.beginFill(0x000000, 0.75);
		darkenBg.drawRect(0, 0, game.world.width, game.world.height);
		backToMapButton.anchor.setTo(0.5);
		nextLevelButton.anchor.setTo(0.5);
		closeButton.anchor.setTo(0.5);
		backToMapButton.setSounds(game.sounds.over, null, game.sounds.click);
		nextLevelButton.setSounds(game.sounds.over, null, game.sounds.click_2);
		closeButton.setSounds(game.sounds.over, null, game.sounds.click);

		titleText.tint = warningText.tint = 0xeb3b80;
		titleText.anchor.setTo(0.5);

		warningBg.beginFill(0xffffff);
		warningBg.drawRect(-120, -30, 240, 40);
		warningBg.alpha = 0.001;
		warningText.anchor.setTo(0.5);

		if(currentLevelIndex + 1 > game.settings.getMaxLevel()){
			nextLevelButton.destroy();
			backToMapButton.y = 360;
			titleText.y = 305 - titleText.textHeight * 0.35;
		}

		bg.anchor.setTo(0.5);
		decorLeft.anchor.setTo(0.5);
		decorRight.anchor.setTo(0.5);
		closeButton.anchor.setTo(0.5);
		bg.alpha = titleText.alpha = 1;

		darkenBg.alpha = decorLeft.alpha = decorRight.alpha = this.menuGroup.alpha = 1;

		game.add.tween(darkenBg)
			.from({alpha: 0}, 750, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(bg)
			.from({alpha: 0}, 200, Phaser.Easing.Quadratic.In, true);
		game.add.tween(bg.scale)
			.from({x: 1.2, y: 1.2}, 800, Phaser.Easing.Quadratic.Out, true);

		game.add.tween(this.menuGroup)
			.from({alpha: 0}, 500, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(decorLeft)
			.from({alpha: 0, x: decorLeft.x + 50, y: decorLeft.y - 50}, 500, Phaser.Easing.Quintic.Out, true);
		game.add.tween(decorLeft.scale)
			.from({x: 0.5, y: 0.5}, 500, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(decorRight)
			.from({alpha: 0, x: decorRight.x - 50, y: decorRight.y + 50}, 500, Phaser.Easing.Quintic.Out, true);
		game.add.tween(decorRight.scale)
			.from({x: 0.5, y: 0.5}, 500, Phaser.Easing.Quadratic.Out, true);

		game.add.tween(titleText)
			.from({y: titleText.y - 30}, 700, Phaser.Easing.Elastic.Out, true, 100);
		game.add.tween(titleText)
			.from({alpha: 0}, 200, Phaser.Easing.Quadratic.In, true, 100);

		game.add.tween(backToMapButton)
			.from({x: backToMapButton.x - 50}, 700, Phaser.Easing.Back.Out, true);
		game.add.tween(nextLevelButton)
			.from({x: nextLevelButton.x + 50}, 700, Phaser.Easing.Back.Out, true);
		game.add.tween(closeButton)
			.from({angle: game.rnd.between(-50, 50)}, 700, Phaser.Easing.Elastic.Out, true);

		this.addChildren.call(this, this.menuGroup, [
			darkenBg,
			bg,
			decorLeft,
			decorRight,
			titleText,
			backToMapButton,
			nextLevelButton,
			closeButton]);
		this.addChildren.call(this, backToMapButton, [warningBg, warningText]);

		bg.inputEnabled = true;
		overlay.bringToTop();
	},
	handleMenuBackToMapClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		game.track.event('menu', 'click', 'back_to_map');
		game.state.start('LevelSelect', true, false);
	},
	handleMenuNextLevelClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		game.track.event('menu', 'click', 'next_level');
		this.levelNext.call(this);
	},
	handleMenuCloseClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		e.inputEnabled = false;
		game.track.event('menu', 'click', 'close');
		var tween = game.add.tween(this.menuGroup)
			.to({alpha: 0}, 300, Phaser.Easing.Quadratic.In, true)
			.onComplete.add(function(){
				this.determineIfCanPick.call(this);
				this.menuGroup.destroy();
				this.menuGroup = null;
			}, this);
	},
	hasCollectedAll: function(){
		var collectedCount = 0,
			collectedMax = 0,
			key, collectedText;
		for(key in jsonData.nums){
			if(typeof jsonData.nums[key].page === 'undefined' || jsonData.nums[key].page === '' || jsonData.nums[key].page < 0){
				continue;
			}
			collectedMax++;
			if(game.settings.hasCollected.call(this, key)){
				collectedCount++;
			}
		}
		return collectedCount === collectedMax;
	},
	requestEndGameDialog: function(){
		if(this.menuGroup !== null || this.tweenCount > 0){
			return;
		}
		if(currentLevelIndex + 1 > game.settings.getMaxLevel() && currentLevelIndex + 1 < jsonData.levels.length ){
			game.settings.setMaxLevel(currentLevelIndex + 1);
		}
		this.canPick = false;
		this.menuGroup = game.add.group();
		var bg, decorLeft, decorRight, levelContainer, topText, bottomText, levelText, backToMapButton, closeButton, bottomButton;
			darkenBg = game.make.graphics(0, 0);
		if(this.isLevelMystery.call(this) && !this.hasCollectedAll.call(this)){
			bg = game.make.sprite(480, 360, jsonData.sheet.game, 'summary/replay_bg');
			decorLeft = game.make.sprite(290, 568, jsonData.sheet.game, 'summary/summary_decor_bottom_left');
			decorRight = game.make.sprite(674, 170, jsonData.sheet.game, 'summary/summary_decor_top_right');
			text = game.make.bitmapText(480, 280, 'brady_bunch_remastered', jsonData.end_game.incomplete.join('\n'), 38);
			backToMapButton = game.make.button(480, 442, jsonData.sheet.game, this.handleSummaryBackToMapClick, this,
				'shared/alt_back_to_map_over', 'shared/alt_back_to_map_up', 'shared/alt_back_to_map_down', 'shared/alt_back_to_map_up');
			bottomButton = game.make.button(480, 520, jsonData.sheet.game, this.handleCollectionClick, this,
				'shared/view_collection_over', 'shared/view_collection_up', 'shared/view_collection_down', 'shared/view_collection_up');
			closeButton = game.make.button(735, 115, jsonData.sheet.game, this.handleSummaryCloseClick, this,
				'shared/close_over', 'shared/close_up', 'shared/close_down', 'shared/close_up');
			this.addChildren.call(this, this.menuGroup, [
				darkenBg,
				bg,
				decorLeft,
				decorRight,
				text,
				backToMapButton,
				bottomButton,
				closeButton]);
		}else{
			if(this.hasCollectedAll.call(this)){
				// This mask is a workaround to hide a 1px bleed on this.animation - msunwoo
				var mask = game.add.graphics(0, 0),
					animation01 = jsonData.animations.animation01;
				mask.beginFill(0xffffff);
				mask.drawRect(331 - animation01.w / 2 * 0.9, 306 - animation01.h / 2 * 0.9, animation01.w * 0.9 - 2, animation01.h * 0.9 - 2);
				this.animation = game.add.sprite(330, 305, this.levelData.animation);
				this.animation.mask = mask;
				text = game.make.bitmapText(330, 507, 'brady_bunch_remastered', jsonData.end_game.complete.join('\n'), 38);
				backToMapButton = game.make.button(742, 388, jsonData.sheet.game, this.handleSummaryBackToMapClick, this,
					'shared/alt_back_to_map_over', 'shared/alt_back_to_map_up', 'shared/alt_back_to_map_down', 'shared/alt_back_to_map_up');
				bottomButton = game.make.button(742, 474, jsonData.sheet.game, this.handleCollectionClick, this,
					'shared/view_collection_over', 'shared/view_collection_up', 'shared/view_collection_down', 'shared/view_collection_up');
				levelContainer = game.make.sprite(736, 274, jsonData.sheet.game, 'summary/summary_level_container');
				levelText = game.make.bitmapText(736, 275, 'brady_bunch_remastered', this.levelData.subtitle, 45);
				this.animation.scale.setTo(0.9);
			}else{
				text = game.make.bitmapText(746, 228, 'brady_bunch_remastered', jsonData.end_game.text.join('\n'), 38);
				backToMapButton = game.make.button(754, 422, jsonData.sheet.game, this.handleSummaryBackToMapClick, this,
					'shared/back_to_map_over', 'shared/back_to_map_up', 'shared/back_to_map_down', 'shared/back_to_map_up');
				if(currentLevelIndex < jsonData.levels.length - 1){
					bottomButton = game.make.button(754, 510, jsonData.sheet.game, this.handleMenuNextLevelClick, this,
						'shared/next_level_over', 'shared/next_level_up', 'shared/next_level_down', 'shared/next_level_up');
				}else{
					bottomButton = game.make.button(754, 510, jsonData.sheet.game, this.handleMenuNextLevelClick, this,
						'shared/play_again_over', 'shared/play_again_up', 'shared/play_again_down', 'shared/play_again_up');
				}
				bottomButton.anchor.setTo(0.5);
				bottomButton.setSounds(game.sounds.over, null, game.sounds.click_2);
				levelContainer = game.make.sprite(748, 324, jsonData.sheet.game, 'summary/summary_level_container');
				levelText = game.make.bitmapText(746, 325, 'brady_bunch_remastered', this.levelData.subtitle, 45);
				this.animation = game.add.sprite(334, 381, this.levelData.animation);
			}
			bg = game.make.sprite(480, 360, jsonData.sheet.game, 'summary/summary_bg');
			decorLeft = game.make.sprite(104, 556, jsonData.sheet.game, 'summary/summary_decor_bottom_left');
			decorRight = game.make.sprite(854, 154, jsonData.sheet.game, 'summary/summary_decor_top_right');
			closeButton = game.make.button(907, 105, jsonData.sheet.game, this.handleSummaryCloseClick, this,
				'shared/close_over', 'shared/close_up', 'shared/close_down', 'shared/close_up');
			this.animation.anchor.setTo(0.5);
			this.animation.animations.add('fun');
			this.animation.animations.play('fun', jsonData.animations[this.levelData.animation].fps, true, false);
			levelContainer.anchor.setTo(0.5);
			levelText.tint = 0xeb3b80;
			levelText.anchor.setTo(0.5);
			levelText.alpha = levelContainer.alpha = 1;
			game.add.tween(levelText)
				.from({y: levelText.y - 30}, 700, Phaser.Easing.Elastic.Out, true, 300);
			game.add.tween(levelContainer)
				.from({y: levelContainer.y - 30}, 700, Phaser.Easing.Elastic.Out, true, 300);
			game.add.tween(levelContainer)
				.from({alpha: 0}, 200, Phaser.Easing.Quadratic.In, true, 200);
			game.add.tween(levelText)
				.from({alpha: 0}, 200, Phaser.Easing.Quadratic.In, true, 300);
			this.addChildren.call(this, this.menuGroup, [
				darkenBg,
				bg,
				this.animation,
				levelContainer,
				decorLeft,
				decorRight,
				text,
				levelText,
				backToMapButton,
				bottomButton,
				closeButton]);

		}
		this.addOverScaling([backToMapButton, bottomButton, closeButton]);
		bottomButton.anchor.setTo(0.5);
		bottomButton.setSounds(game.sounds.over, null, game.sounds.click_2);
		darkenBg.beginFill(0x000000, 0.75);
		darkenBg.drawRect(0, 0, game.world.width, game.world.height);
		backToMapButton.setSounds(game.sounds.over, null, game.sounds.click);
		closeButton.setSounds(game.sounds.over, null, game.sounds.click);
		// this.animation.scale.setTo(492 / this.animation.width);

		text.tint = 0xeb3b80;
		text.anchor.setTo(0.5);
		text.align = 'center';
		
		bg.anchor.setTo(0.5);
		decorLeft.anchor.setTo(0.5);
		decorRight.anchor.setTo(0.5);
		backToMapButton.anchor.setTo(0.5);
		closeButton.anchor.setTo(0.5);
		bg.alpha = text.alpha = 1;

		darkenBg.alpha = decorLeft.alpha = decorRight.alpha = this.menuGroup.alpha = 1;

		game.add.tween(darkenBg)
			.from({alpha: 0}, 1500, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(bg)
			.from({alpha: 0}, 200, Phaser.Easing.Quadratic.In, true);
		game.add.tween(bg.scale)
			.from({x: 1.2, y: 1.2}, 800, Phaser.Easing.Quadratic.Out, true);

		game.add.tween(this.menuGroup)
			.from({alpha: 0}, 500, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(decorLeft)
			.from({alpha: 0, x: decorLeft.x + 50, y: decorLeft.y - 50}, 500, Phaser.Easing.Quintic.Out, true);
		game.add.tween(decorLeft.scale)
			.from({x: 0.5, y: 0.5}, 500, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(decorRight)
			.from({alpha: 0, x: decorRight.x - 50, y: decorRight.y + 50}, 500, Phaser.Easing.Quintic.Out, true);
		game.add.tween(decorRight.scale)
			.from({x: 0.5, y: 0.5}, 500, Phaser.Easing.Quadratic.Out, true);

		game.add.tween(text)
			.from({y: text.y - 30}, 700, Phaser.Easing.Elastic.Out, true, 100);
		game.add.tween(text)
			.from({alpha: 0}, 200, Phaser.Easing.Quadratic.In, true, 100);

		game.add.tween(closeButton)
			.from({angle: game.rnd.between(-50, 50)}, 700, Phaser.Easing.Elastic.Out, true);
		game.add.tween(backToMapButton)
			.from({x: backToMapButton.x - 50}, 700, Phaser.Easing.Back.Out, true);
		game.add.tween(bottomButton)
			.from({x: '+50'}, 700, Phaser.Easing.Back.Out, true);

		bg.inputEnabled = true;
		game.sounds.finish_level.play();
		overlay.bringToTop();
		game.track.event('game', 'complete', this.levelData.subtitle);
		game.track.event('summary', 'open', 'level_complete', currentLevelIndex + 1);
	},
	handleCollectionClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		game.state.start('Collection', true, false);
	},
	handleSummaryBackToMapClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		game.track.event('summary', 'click', 'back_to_map');
		game.state.start('LevelSelect', true, false);
	},
	handleSummaryNextLevelClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		game.track.event('summary', 'click', 'next_level');
		this.levelNext.call(this);
	},
	handleSummaryCloseClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		game.track.event('summary', 'click', 'close');
		var tween = game.add.tween(this.menuGroup)
			.to({alpha: 0}, 300, Phaser.Easing.Quadratic.In, true)
			.onComplete.add(function(){
				game.state.start('LevelSelect', true, false);
			}, this);
	},
	initProgress: function(){
		var baseSprite,
			base = this.getRandomBase.call(this),
			baseData = jsonData.bases[base.name],
			scale;
		this.lastProgressPos = {
			x: jsonData.game.progress.x + baseData.contents.x, 
			y: jsonData.game.progress.y + baseData.contents.y
		};
		this.progress = game.add.group();
		this.progress.middle = game.add.group();
		this.progress.front = game.add.group();
		this.progress.x = jsonData.game.progress.x;
		this.progress.y = jsonData.game.progress.y;
		this.progress.middle.x = this.progress.front.x = jsonData.game.progress.x;
		this.progress.middle.y = this.progress.front.y = jsonData.game.progress.y;
		baseSprite = game.make.sprite(baseData.image.x, baseData.image.y, this.levelData.theme, 'containers/' + base.name);
		baseSprite.anchor.setTo(0.5);
		// scale = jsonData.game.progress.base_max_size / Math.max(baseSprite.width, baseSprite.height);
		baseSprite.scale.setTo(0.32);
		this.progress.addChild(baseSprite);
		this.initProgressStackBg.call(this, baseData, 1 / scale);
	},
	initProgressStackBg: function(baseData, scale){
		var i, ln, data, sprite, scale;
		if(this.isLevelRandom.call(this)){
			this.stackMax = (typeof jsonData.goals[currentLevelIndex] === 'undefined') ? 9 : jsonData.goals[currentLevelIndex];
		}else{
			this.stackMax = this.levelData.recipe.length;
		}
		for(i = 0; i < this.stackMax; i++){
			data = jsonData.game.progress.bg_positions[i];
			if(this.isLevelRandom.call(this)){
				sprite = game.make.sprite(
					data.x + (baseData.contents.x) + jsonData.game.progress.bg_offset.x, 
					data.y + (baseData.contents.y) + jsonData.game.progress.bg_offset.y + 8, 
					jsonData.sheet.game, data.sprite);
				sprite.scale.setTo(jsonData.game.progress.recipe_item_max_size / Math.max(sprite.width, sprite.height));
				this.progress.addChild(sprite);
			}else{
				sprite = this.requestTintedSprite.call(this, 
					data.x + (baseData.contents.x) + jsonData.game.progress.bg_offset.x + jsonData.game.progress.nom_offset.x,
					data.y + (baseData.contents.y) + jsonData.game.progress.bg_offset.y + jsonData.game.progress.nom_offset.y,
					this.levelData.theme, 
					(this.levelData.recipe[i].indexOf('_Nom_') >= 0 ? 'noms/' : 'nums/') + this.levelData.recipe[i], 
					'#ffffff', 0.5);
				this.progress.middle.addChild(sprite);
			}
			sprite.anchor.setTo(0.5);
			sprite.angle = data.r;
			this.stackBG.push(sprite);
			game.add.tween(sprite)
				.from({y: sprite.y - 100}, 1000 + i * 150, Phaser.Easing.Bounce.Out, true, game.rnd.between(0, 200));
			game.add.tween(sprite)
				.from({alpha: 0}, 200, Phaser.Easing.Bounce.Out, true);
		}
	},
	requestTintedSprite: function(x, y, key, name, color, alpha){
		var sprite,
			frame = game.cache.getFrameByName(key, name),
			color = Phaser.Color.hexToColor(typeof color !== 'undefined' ? color : '#ffffff'),
			source = game.make.sprite(0, 0, key, name),
			bmd = game.make.bitmapData(frame.spriteSourceSizeW, frame.spriteSourceSizeH)
				.fill(color.r, color.g, color.b, typeof alpha !== 'undefined' ? alpha : 0.5)
				.blendDestinationAtop()
				.draw(source, -frame.spriteSourceSizeX, -frame.spriteSourceSizeY, frame.spriteSourceSizeW, frame.spriteSourceSizeH);
		this.bitmapDataCache.push(bmd);
		sprite = game.make.sprite(x, y, bmd);
		sprite.scale.setTo(jsonData.game.progress.recipe_item_max_size / Math.max(frame.sourceSizeW, frame.sourceSizeH));
		return sprite;
	},
	queueProgress: function(name, length){
		if(this.lastProgressPos === null){
			this.lastProgressPos = {
				x: this.progress.x,
				y: this.progress.y
			};
		}
		game.time.events.add(1000 * game.time.events.length || (length <= 3 ? 250 : 750), function(){
			var i, found, 
				item = game.make.sprite(0, 0, this.levelData.theme, (name.indexOf('_Nom_') >= 0 ? 'noms/' : 'nums/') + name),
				container = game.make.group();
			container.characterName = name;
			container.front = game.make.group();
			container.back = game.make.group();
			container.addChild(container.back);
			container.addChild(container.front);
			container.x = jsonData.game.grid_offset.x + jsonData.game.icon.w * jsonData.game.columns * 0.5 + jsonData.game.character_burst.x - this.progress.x;
			container.y = jsonData.game.grid_offset.y + jsonData.game.icon.h * jsonData.game.rows * 0.5 + jsonData.game.character_burst.y - this.progress.y;
			this.progress.front.addChild(container);
			this.anchorCenter.call(this, item);
			this.flashBurst.call(this, container.back, ['state_game/burst_white', 'state_game/burst_yellow'], item);
			container.front.add(item);
			this.showNamePlate(container.front, name);
			this.scentBurst(container.front, name, length);
			if(this.isLevelMystery.call(this)){
				found = false;
				for(i = 0; i < this.stack.length; i++){
					if(name === this.stack[i].characterName){
						found = true;
						break;
					}
				}
				if(found){
					this.matchFadeOut.call(this, container, item);
				}else{
					this.matchToStack.call(this, container, item);
				}
			}else if(this.isLevelRandom.call(this)){
				if(this.stack.length < this.stackMax){
					this.matchToStack.call(this, container, item);
				}else{
					this.matchFadeOut.call(this, container, item);
				}
			}else{
				if(this.stack.length < this.stackMax && this.levelData.recipe[this.stack.length] === name){
					this.matchToStack.call(this, container, item);
				}else{
					this.matchFadeOut.call(this, container, item);
				}
			}
			if(length === 4 || length === 5){
				this.requestMatchBurst.call(this, container, length);
			}
		}, this);
	},
	requestMatchBurst: function(container, length){
		var matchBurst = game.make.sprite(0, 180),
			matchBurstBg = game.make.sprite(0, 0, jsonData.sheet.game, 'state_game/match_bg')
			matchBurstText = game.make.sprite(0, 0, jsonData.sheet.game, 'state_game/match_' + length);
		matchBurstBg.anchor.setTo(0.5);
		matchBurstText.anchor.setTo(0.5);
		matchBurstBg.scale.setTo(game.rnd.between(0.2, 0.5));
		matchBurstText.scale.setTo(game.rnd.between(2, 3));
		matchBurstBg.angle = game.rnd.between(-20, 20);
		matchBurstText.angle = game.rnd.between(-20, 20);
		matchBurst.alpha = 0;
		matchBurst.addChild(matchBurstBg);
		matchBurst.addChild(matchBurstText);
		container.front.addChild(matchBurst);
		game.add.tween(matchBurstBg)
			.to({angle: game.rnd.between(-20, 20)}, 1000, Phaser.Easing.Linear.None, true);
		game.add.tween(matchBurstText)
			.to({angle: 0}, 800, Phaser.Easing.Elastic.Out, true);
		game.add.tween(matchBurstBg.scale)
			.to({x: 1, y: 1}, 1000, Phaser.Easing.Elastic.Out, true);
		game.add.tween(matchBurstText.scale)
			.to({x: 1, y: 1}, 1000, Phaser.Easing.Elastic.Out, true);
		game.add.tween(matchBurst)
			.to({alpha: 1}, 200, Phaser.Easing.Quadratic.Out, false)
			.to({alpha: 0}, 200, Phaser.Easing.Quadratic.In, false, 800)
			.start()
			.onComplete.add(function(){
				matchBurst.destroy();
				matchBurst = matchBurstBg = matchBurstText = null;
			}, this);
	},
	matchFadeOut: function(container, item){
		this.fadeInDelayOut(container, 200, 800, 200, function(){
			var index = this.orbitters.indexOf(container.front);
			if(index !== -1){
				this.orbitters.splice(index, 1);
			}
			container.destroy();
		}.bind(this));
	},
	matchToStack: function(container, item){
		this.animateContainer.call(this, container, item);
		this.removeStackBg.call(this);
		this.lastProgressPos.x += jsonData.game.progress.stack.x;
		this.lastProgressPos.y += jsonData.game.progress.stack.y;
		this.tweenCount++;
	},
	determineIfCanPick: function(){
		this.canPick = this.stack.length < this.stackMax;
	},
	animateContainer: function(container, item){
		this.stack.push(container);
		this.determineIfCanPick.call(this);
		container.alpha = 0;
		game.add.tween(container)
			.to({alpha: 1}, 200, Phaser.Easing.Quadratic.In, true);
		game.add.tween(container)
			.to({
				x: this.lastProgressPos.x + jsonData.game.progress.stack.x - jsonData.game.progress.x + 
				((('' + jsonData.levels[currentLevelIndex].recipe[0]).indexOf('_Nom_') >= 0) ? jsonData.game.progress.nom_offset.x : 0)
			}, 800, Phaser.Easing.Quadratic.InOut, true, 1000);
		game.add.tween(container.scale)
			.to({
				x: jsonData.game.icon.w / item.width * jsonData.game.icon.progress_scale,
				y: jsonData.game.icon.h / item.height * jsonData.game.icon.progress_scale
			}, 800, Phaser.Easing.Back.In, true, 1000);
		game.add.tween(container)
			.to({
				y: this.lastProgressPos.y + jsonData.game.progress.stack.y - jsonData.game.progress.y + 
				((('' + jsonData.levels[currentLevelIndex].recipe[0]).indexOf('_Nom_') >= 0) ? jsonData.game.progress.nom_offset.y : 0),
				angle: game.rnd.between(-7, 7)
			}, 800, Phaser.Easing.Back.In, true, 1000)
			.onComplete.add(function(target, tween){
				var index = this.orbitters.indexOf(container.front);
				if(index !== -1){
					var orbitter = this.orbitters.splice(index, 1);
				}
				container.addChild(target);
				this.progress.addChild(container);
				this.tweenCount--;
				if(this.tweenCount > 0){
					return;
				}
				if(this.stack.length >= this.stackMax){
					this.requestEndGameDialog.call(this);
				}
			}, this);
		return container;
	},
	removeStackBg: function(){
		if(this.stack.length > this.stackBG.length){
			return;
		}
		var sprite = this.stackBG[this.stack.length - 1];
		game.add.tween(sprite)
			.to({alpha: 0}, 500, Phaser.Easing.Quadratic.Out, true, this.isLevelRandom.call(this) ? 2000 : 1800);
		game.add.tween(sprite.scale)
			.to(this.isLevelRandom.call(this) ? {x: 2, y: 2} : {x: 0.5, y: 0.5}, 500, Phaser.Easing.Quadratic.Out, true, 
				this.isLevelRandom.call(this) ? 2000 : 1800);
	},
	flashBurst: function(parent, burstNames, item){
		if(this.isArray(burstNames)){
			burstNames.forEach(burstIt.bind(this));
		}else{
			burstIt.call(this, burstNames);
		}
		function burstIt(burstName){
			var burst = game.make.sprite(0, 0, jsonData.sheet.game, burstName);
			burst.z = -100;
			this.anchorCenter.call(this, burst);
			item.scale.setTo(jsonData.game.character_burst.w / item.width, jsonData.game.character_burst.h / item.height);
			parent.addChild(burst);
			this.fadeInDelayOut(burst, 200, 600, 200);
			this.setScale.call(this, burst, 0.5);
			game.add.tween(burst.scale)
				.to({x: 1, y: 1}, 400, Phaser.Easing.Quadratic.Out)
				.to({x: 0.5, y: 0.5}, 400, Phaser.Easing.Quadratic.In, false, 200)
				.start();
			game.add.tween(burst)
				.to({angle: game.rnd.between(-180, 180)}, 2000, Phaser.Easing.Linear.None, true);
		}
	},
	showNamePlate: function(parent, name){
		var nameText = game.add.bitmapText(0, 1, 'brady_bunch_remastered', jsonData[name.indexOf('_Nom_') >= 0 ? 'noms' : 'nums'][name].name, 25),
			nameContainer = game.add.sprite(0, 0, jsonData.sheet.game, 'state_game/name_container');
		this.anchorCenter.call(this, nameContainer);
		parent.addChild(nameContainer);
		nameText.anchor.setTo(0.5);
		nameContainer.addChild(nameText);
		nameContainer.x = jsonData.game.name_plate.x;
		nameContainer.y = jsonData.game.name_plate.y;
		nameContainer.angle = game.rnd.between(-3, 3);
		game.add.tween(nameContainer)
			.to({angle: nameContainer.angle + game.rnd.between(-2, 2)}, 1000, Phaser.Easing.Quadratic.Out, true);
		this.fadeInDelayOut(nameContainer, 150, 1000, 200);
	},
	scentBurst: function(orbitter, name, length){
		var i, scentIcon,
			scentIconName = jsonData.scents[jsonData[name.indexOf('_Nom_') >= 0 ? 'noms' : 'nums'][name].scent].icon,
			iconCount = length * 2 - game.rnd.between(0, 1);
		orbitter.icons = [];
		for(i = 0; i < iconCount; i++){
			scentIcon = game.add.sprite(
				Math.cos(Math.PI * 2 * i / iconCount) * jsonData.game.scent_icons.radius, 
				Math.sin(Math.PI * 2 * i / iconCount) * jsonData.game.scent_icons.radius, 
				jsonData.sheet.game, 'scents/' + scentIconName);
			scentIcon.scale.setTo(game.rnd.realInRange(jsonData.game.scent_icons.scale.min, jsonData.game.scent_icons.scale.max));
			scentIcon.anchor.setTo(0.5);
			orbitter.add(scentIcon);
			scentIcon.angle = game.rnd.between(-1080, 1080);
			game.add.tween(scentIcon)
				.to({angle: game.rnd.between(-1080, 1080)}, 2000, Phaser.Easing.Linear.None, true);
			game.add.tween(scentIcon)
				.to({
					x: Math.cos(game.math.PI2 * 1.46) * jsonData.game.scent_icons.radius * 1.1, 
					y: Math.sin(game.math.PI2 * 1.46) * jsonData.game.scent_icons.radius * 1.1,
					alpha: (i === 0 ? 1 : 0),
					angle: game.rnd.pick([360, -360])
				}, game.rnd.between(400, 600), Phaser.Easing.Back.Out, true, 2000);
			game.add.tween(scentIcon.scale)
				.to({
					x: jsonData.game.scent_icons.end_scale, 
					y: jsonData.game.scent_icons.end_scale
				}, game.rnd.between(400, 600), Phaser.Easing.Back.Out, true, 2000);
			orbitter.icons.push(scentIcon);
		}
		this.orbitters.push(orbitter);
	},
	getRandomProperty: function(obj){
		var keys = Object.keys(obj);
		var bleat = keys[keys.length * Math.random() << 0];
		return bleat;
	},
	update: function(){
		this.orbitters.forEach(function(orbitter, index, arr){
			orbitter.icons.forEach(function(icon, iconIndex, iconArr){
				icon.x = Math.cos(game.math.PI2 * iconIndex / iconArr.length + game.time.time * 0.002) * jsonData.game.scent_icons.radius;
				icon.y = Math.sin(game.math.PI2 * iconIndex / iconArr.length + game.time.time * 0.002) * 0.2 * jsonData.game.scent_icons.radius;
			});
			orbitter.sort('y');
		}, this);
	},
	fadeInDelayOut: function(sprites, fadeInMs, delayMs, fadeOutMs){
		if(this.isArray(sprites)){
			sprites.forEach(fadeIt);
		}else{
			fadeIt(sprites);
		}
		function fadeIt(sprite){
			sprite.alpha = 0;
			game.add.tween(sprite)
				.to({alpha: 1}, fadeInMs, Phaser.Easing.Quadratic.In)
				.to({alpha: 0}, fadeOutMs, Phaser.Easing.Quadratic.Out, false, delayMs)
				.start();
		}
	},
	setScale: function(sprites, value){
		if(this.isArray(sprites)){
			sprites.forEach(scaleIt);
		}else{
			scaleIt(sprites);
		}
		function scaleIt(sprite){
			sprite.scale.setTo(value);
		}
	},
	addChildren: function(container, children){
		if(this.isArray(children)){
			children.forEach(function(child){
				addChild(child);
			}, this);
		}else{
			addChild(children);
		}
		function addChild(child){
			container.addChild(child);
		}
	},
	anchorCenter: function(sprites){
		if(this.isArray(sprites)){
			sprites.forEach(centerIt);
		}else{
			centerIt(sprites);
		}
		function centerIt(sprite){
			sprite.anchor.setTo(0.5);
		}
	},
	isArray: function(what){
		return Object.prototype.toString.call(what) === '[object Array]';
	},
	getRandomBase: function(){
		var themeList = [];
		jsonData.themes[this.levelData.theme].bases.forEach(function(name){
			themeList.push({theme:this.levelData.theme, name:name});
		}, this);
		return game.rnd.pick(themeList);
	},
	initInput: function(){
		this.canPick = true;
		game.input.maxPointers = 1;
		game.input.onDown.add(this.orbSelect, this);
		game.input.onUp.add(this.orbDeselect, this);
		game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(this.handleMenuRequested, this);
	},
	levelNext: function(e){
		this.requestLevel.call(this, currentLevelIndex + 1 > jsonData.levels.length - 1 ? jsonData.levels.length - 1 : currentLevelIndex + 1);
	},
	levelPrevious: function(e){
		this.requestLevel.call(this, currentLevelIndex - 1 < 0 ? jsonData.levels.length - 1 : currentLevelIndex - 1);
	},
	initLevel: function(){
		this.orbColors = this.levelData.max_types;
		this.randomizePossibleTypes.call(this);
		this.drawField.call(this);
		this.requestSuggestion.call(this);
		this.canPick = true;
	},
	requestLevel: function(levelIndex){
		currentLevelIndex = levelIndex;
		game.state.start('Game', true, false);
	},
	requestSuggestion: function(){
		this.cancelSuggestion.call(this);
		if(this.tweenCount <= 0 && this.matchInBoard.call(this)){
			this.handleNoRemainingMatches.call(this);
		}else{
			this.suggestionTimeout = game.time.events.add(jsonData.game.suggestion_delay_ms, this.showSuggestion, this);
		}
	},
	cancelSuggestion: function(){
		if(this.suggestionTimeout){
			game.time.events.remove(this.suggestionTimeout);
			this.suggestionTimeout = null;
		}
	},
	randomizePossibleTypes: function(){
		var i, ln, availableTypes = [];
		this.possibleTypes = [];
		if(this.isLevelRandom.call(this)){
			jsonData.levels[currentLevelIndex].recipe.forEach(function(item){
				availableTypes.push(item);
			}.bind(this));
			var maxTypes = this.levelData.max_types;
			if(availableTypes[0].indexOf('_Nom_') >= 0){
				this.possibleTypes.push(availableTypes.splice(1, 1));
				maxTypes--;
			}
			for(i = 0, ln = maxTypes; i < ln; i++){
				this.possibleTypes.push(availableTypes.splice(game.rnd.integerInRange(0, availableTypes.length - 1), 1));
			}
		}else{
			var uniqueRecipeItems = this.levelData.recipe.getUnique();
			this.possibleTypes.push.apply(this.possibleTypes, uniqueRecipeItems);
		}
	},
	scaleOrb: function(orb, targetScale){
		if(typeof orb.originalScale === 'undefined'){
			orb.originalScale = this.maxTileDimension / Math.max(orb.width, orb.height);
		}
		orb.scale.setTo(orb.originalScale * targetScale);
	},
	drawField: function(){
		var orb, i, j, randomColor, icon, name;
		this.orbGroup.x = jsonData.game.grid_offset.x;
		this.orbGroup.y = jsonData.game.grid_offset.y;
		for(i = 0; i < jsonData.game.rows; i++){
			this.gameArray[i] = [];
			for(j = 0; j < jsonData.game.columns; j++){
				do{
					if(typeof this.gameArray[i][j] !== 'undefined' && this.gameArray[i][j] !== null && 
						typeof this.gameArray[i][j].orbSprite !== 'undefined' && this.gameArray[i][j].orbSprite !== null){
						this.gameArray[i][j].orbSprite.destroy();
					}
					randomColor = game.rnd.between(0, this.orbColors - 1);
					name = this.possibleTypes[randomColor];
					icon = (('' + name).indexOf('_Nom_') >= 0 ? "noms/" : "nums/") + name;
					orb = game.add.button(
						jsonData.game.icon.w * j + jsonData.game.icon.w / 2, 
						jsonData.game.icon.h * i + jsonData.game.icon.h / 2, 
						this.levelData.theme, null, this, icon, icon, icon, icon);
					this.scaleOrb.call(this, orb, 1);
					orb.rotation = game.rnd.frac() * 0.5 - 0.25;
					orb.anchor.set(0.5);
					this.orbGroup.add(orb);
					this.gameArray[i][j] = {
						orbColor: randomColor,
						orbSprite: orb
					}
				} while(this.isMatch(i, j));
			}
		}
		this.selectedOrb = null;
	},
	showSuggestion: function(){
		var matchFound = false, i, j;
		for(i = 0; i < jsonData.game.rows - 1; i++){
			for(j = 0; j < jsonData.game.columns - 1; j++){
				this.tmpSwap.call(this, i, j, i + 1, j);
				if(this.matchInBoard.call(this)){
					this.hintTweenA = this.hintAnimation.call(this, this.gameArray[i + 1][j].orbSprite, game.rnd.between(500, 800));
					this.hintTweenB = this.hintAnimation.call(this, this.gameArray[i][j].orbSprite, game.rnd.between(500, 800));
					matchFound = true;
					this.showArrowHint.call(this);
				}
				this.tmpSwap.call(this, i, j, i + 1, j);
				if(matchFound){
					return;
				}
				this.tmpSwap.call(this, i, j, i, j + 1);
				if(this.matchInBoard.call(this)){
					this.hintTweenA = this.hintAnimation.call(this, this.gameArray[i][j + 1].orbSprite, game.rnd.between(500, 1000));
					this.hintTweenB = this.hintAnimation.call(this, this.gameArray[i][j].orbSprite, game.rnd.between(500, 800));
					matchFound = true;
					this.showArrowHint.call(this);
				}
				this.tmpSwap.call(this, i, j, i, j + 1);
				if(matchFound){
					return;
				}
			}
		}
		this.handleNoRemainingMatches.call(this);
	},
	showArrowHint: function(){
		if(!this.arrowHintAvailable || currentLevelIndex < parseInt(jsonData.game.randomUntilLevel)){
			return;
		}
		this.arrowHintAvailable = false;
		game.time.events.add(Phaser.Timer.SECOND * 10, function(){
			this.arrowHintAvailable = true;
		}, this);
		var arrowHint = game.make.sprite(
			this.lastProgressPos.x + jsonData.game.progress.hint_offset.x - jsonData.game.progress.x, 
			this.lastProgressPos.y + jsonData.game.progress.hint_offset.y - jsonData.game.progress.y, 
			jsonData.sheet.game, 'state_game/stack_arrow');
		arrowHint.anchor.setTo(0.5, 1);
		arrowHint.scale.setTo(0.3);
		arrowHint.angle = 90;
		arrowHint.alpha = 0;
		this.progress.front.addChild(arrowHint);
		game.add.tween(arrowHint)
			.to({alpha: 1}, 200, Phaser.Easing.Quadratic.In, false)
			.to({alpha: 0}, 200, Phaser.Easing.Quadratic.In, false, 500)
			.start()
			.onComplete.add(function(){
				arrowHint.destroy();
			}, this);
		game.add.tween(arrowHint)
			.from({x: "+50"}, 1000, Phaser.Easing.Back.Out, true);
	},
	hintAnimation: function(sprite, delay){
		return game.add.tween(sprite)
			.delay(game.rnd.between(0, 3000))
			.to({y: "-5"}, game.rnd.between(100, 300), Phaser.Easing.Bounce.Out, false, delay, true, true)
			.repeatAll(-1)
			.repeatDelay(game.rnd.between(5000, 10000))
			.yoyo(true)
			.start();
	},
	tmpSwap: function(row1, col1, row2, col2){
		var tmp = this.gameArray[row1][col1];
		this.gameArray[row1][col1] = this.gameArray[row2][col2];
		this.gameArray[row2][col2] = tmp;
	},
	orbSelect: function(e){
		var row, col, pickedOrb;
		if(this.canPick && this.tweenCount <= 0){
			row = Math.floor((game.input.y - jsonData.game.grid_offset.y) / jsonData.game.icon.h);
			col = Math.floor((game.input.x - jsonData.game.grid_offset.x) / jsonData.game.icon.h);
			pickedOrb = this.gemAt.call(this, row, col);
			if(pickedOrb != -1){
				if(this.hintTweenA){
					this.hintTweenA.stop();
				}
				if(this.hintTweenB){
					this.hintTweenB.stop();
				}
				if(this.selectedOrb == null){
					this.scaleOrb.call(this, pickedOrb.orbSprite, 1.2);
					pickedOrb.orbSprite.bringToTop();
					this.selectedOrb = pickedOrb;
					game.input.addMoveCallback(this.orbMove, this);
					this.requestSuggestion.call(this);
				}else{
					if(this.areTheSame.call(this, pickedOrb, this.selectedOrb)){
						game.track.event('game', 'swap', 'cancel');
						this.scaleOrb.call(this, this.selectedOrb.orbSprite, 1);
						this.selectedOrb = null;
						this.requestSuggestion.call(this);
					}else{
						if(this.areNext.call(this, pickedOrb, this.selectedOrb)){
							this.scaleOrb.call(this, this.selectedOrb.orbSprite, 1.2);
							this.scaleOrb.call(this, pickedOrb.orbSprite, 1.2);
							this.swapOrbs.call(this, this.selectedOrb, pickedOrb, true);
						}else{
							game.track.event('game', 'swap', 'cancel');
							this.scaleOrb.call(this, this.selectedOrb.orbSprite, 1);
							this.scaleOrb.call(this, pickedOrb.orbSprite, 1.2);
							this.selectedOrb = pickedOrb;
							game.input.addMoveCallback(this.orbMove, this);
							this.requestSuggestion.call(this);
						}
					}
				}
			}
		}
	},
	orbDeselect: function(e){
		game.input.deleteMoveCallback(this.orbMove, this);
	},
	orbMove: function(event, pX, pY){
		if(typeof this.selectedOrb === 'undefined' || this.selectedOrb === null || (event.id !== 0 && event.id !== 1)){
			return;
		}
		var distX = (pX - jsonData.game.grid_offset.x) - this.selectedOrb.orbSprite.x;
		var distY = (pY - jsonData.game.grid_offset.y) - this.selectedOrb.orbSprite.y;
		var deltaRow = 0;
		var deltaCol = 0;
		if(Math.abs(distX) > jsonData.game.icon.w / 2){
			if(distX > 0){
				deltaCol = 1;
			}else{
				deltaCol = -1;
			}
		}
		else{
			if(Math.abs(distY) > jsonData.game.icon.h / 2){
				if(distY > 0){
					deltaRow = 1;
				}else{
					deltaRow = -1;
				}
			}
		}
		if(deltaRow + deltaCol != 0){
			var pickedOrb = this.gemAt.call(this, 
				this.getOrbRow.call(this, this.selectedOrb) + deltaRow, 
				this.getOrbCol.call(this, this.selectedOrb) + deltaCol);
			if(pickedOrb != -1 && this.selectedOrb !== null && pickedOrb !== null){
				if(this.hintTweenA){
					this.hintTweenA.stop();
				}
				if(this.hintTweenB){
					this.hintTweenB.stop();
				}
				this.cancelSuggestion.call(this);
				this.scaleOrb.call(this, this.selectedOrb.orbSprite, 1);
				this.swapOrbs.call(this, this.selectedOrb, pickedOrb, true);
				game.input.deleteMoveCallback(this.orbMove, this);
			}
		}
	},
	swapOrbs: function(orb1, orb2, swapBack){
		var fromColor = orb1.orbColor,
			fromSprite = orb1.orbSprite,
			toColor = orb2.orbColor,
			toSprite = orb2.orbSprite,
			orb1Row = this.getOrbRow.call(this, orb1),
			orb1Col = this.getOrbCol.call(this, orb1),
			orbA = this.gameArray[orb1Row][orb1Col],
			orb2Row = this.getOrbRow.call(this, orb2),
			orb2Col = this.getOrbCol.call(this, orb2),
			orbB = this.gameArray[orb2Row][orb2Col];
		if(orbA === null){
			return;
		}
		if(orbB === null){
			return;
		}
		this.cancelSuggestion.call(this);
		this.canPick = false;
		orbA.orbColor = toColor;
		orbA.orbSprite = toSprite;
		orbB.orbColor = fromColor;
		orbB.orbSprite = fromSprite;
		var orb1Tween = game.add.tween(this.gameArray[orb1Row][orb1Col].orbSprite)
			.to({
				x: orb1Col * jsonData.game.icon.w + jsonData.game.icon.w / 2,
				y: orb1Row * jsonData.game.icon.h + jsonData.game.icon.h / 2
			}, jsonData.game.swap_speed, Phaser.Easing.Cubic.In, true);
		game.add.tween(this.gameArray[orb2Row][orb2Col].orbSprite)
			.to({
				x: orb2Col * jsonData.game.icon.w + jsonData.game.icon.w / 2,
				y: orb2Row * jsonData.game.icon.h + jsonData.game.icon.h / 2
			}, jsonData.game.swap_speed, Phaser.Easing.Cubic.In, true)
			.onComplete.add(function(){
				this.scaleOrb.call(this, orb1.orbSprite, 1); 
				this.scaleOrb.call(this, orb2.orbSprite, 1); 
				if(!this.matchInBoard.call(this) && swapBack){
					game.track.event('game', 'swap', 'invalid');
					this.swapOrbs.call(this, orb1, orb2, false);
				}else{ 
					if(this.matchInBoard.call(this)){
						this.handleMatches.call(this);
					}else{
						this.determineIfCanPick.call(this);
						this.selectedOrb = null;
						this.requestSuggestion.call(this);
					}
				}
			}, this);
		game.add.audio('swap').play();
	},
	areNext: function(orb1, orb2){
		return Math.abs(this.getOrbRow.call(this, orb1) - this.getOrbRow.call(this, orb2)) + 
			Math.abs(this.getOrbCol.call(this, orb1) - this.getOrbCol.call(this, orb2)) == 1;
	},
	areTheSame: function(orb1, orb2){
		return this.getOrbRow.call(this, orb1) == this.getOrbRow.call(this, orb2) && 
			this.getOrbCol.call(this, orb1) == this.getOrbCol.call(this, orb2);
	},
	gemAt: function(row, col){
		if(row < 0 || row >= jsonData.game.rows || col < 0 || col >= jsonData.game.columns){
			return -1;
		}
		return this.gameArray[row][col];
	},
	getOrbRow: function(orb){
		return Math.floor(orb.orbSprite.y / jsonData.game.icon.h);
	},
	getOrbCol: function(orb){
		return Math.floor(orb.orbSprite.x / jsonData.game.icon.w);
	},
	isHorizontalMatch: function(row, col){
		this.a = this.gemAt.call(this, row, col);
		this.b =  this.gemAt.call(this, row, col - 1);
		this.c = this.gemAt.call(this, row, col - 2);
		if(this.a === null || this.b === null || this.c === null){
			return false;
		}
		return this.a.orbColor == this.b.orbColor && this.a.orbColor == this.c.orbColor;
	},
	isVerticalMatch: function(row, col){
		this.a = this.gemAt.call(this, row, col);
		this.b =  this.gemAt.call(this, row - 1, col);
		this.c = this.gemAt.call(this, row - 2, col);
		if(this.a === null || this.b === null || this.c === null){
			return false;
		}
		return this.a.orbColor == this.b.orbColor && this.a.orbColor == this.c.orbColor;
	},
	isMatch: function(row, col){
		return this.isHorizontalMatch.call(this, row, col) || this.isVerticalMatch.call(this, row, col);
	},
	matchInBoard: function(){
		var i, j;
		for(i = 0; i < jsonData.game.rows; i++){
			for(j = 0; j < jsonData.game.columns; j++){
				if(this.isMatch.call(this, i, j)){
					return true;
				}
			}
		}
		return false;
	},
	handleMatches: function(){
		var i, j;
		this.removeMap = [];
		for(i = 0; i < jsonData.game.rows; i++){
			this.removeMap[i] = [];
			for(j = 0; j < jsonData.game.columns; j++){
				this.removeMap[i].push(0);
			}
		}
		this.handleHorizontalMatches.call(this);
		this.handleVerticalMatches.call(this);
		this.destroyOrbs.call(this);
	},
	handleVerticalMatches: function(){
		var i, j, k, s, colorStreak, currentColor, startStreak, gem, type, scent;
		for(i = 0; i < jsonData.game.rows; i++){
			colorStreak = 1;
			currentColor = -1;
			startStreak = 0;
			for(j = 0; j < jsonData.game.columns; j++){ 
				gem = this.gemAt.call(this, i, j);
				if(typeof gem === 'undefined'){
					continue;
				}
				if(this.gemAt.call(this, j, i).orbColor == currentColor){
					colorStreak++;
				}
				if(this.gemAt.call(this, j, i).orbColor != currentColor || j == jsonData.game.rows - 1){
					if(colorStreak >= 3){
						game.add.audio(colorStreak === 3 ? 'match_3' : 'match_4').play();
						type = "" + this.possibleTypes[currentColor];
						if(colorStreak === 4 || colorStreak === 5){
							scent = jsonData.scents[jsonData[type.indexOf('_Nom_') >= 0 ? 'noms' : 'nums'][type].scent].icon;
							for(s = 0; s < colorStreak; s++){
								this.scentIconBurst.call(this, i, startStreak + s, scent);
							}
						}
						game.track.event('game', 'match', colorStreak);
						game.track.event('game', 'collected', type);
						game.settings.addCollected.call(this, type);
						this.queueProgress.call(this, type, colorStreak);
						for(k = 0; k < colorStreak; k++){
							this.removeMap[startStreak + k][i]++;
						}
					}
					startStreak = j;
					colorStreak = 1;
					currentColor = this.gemAt.call(this, j, i).orbColor;
				}
			}
		}
	},
	handleHorizontalMatches: function(){
		var i, j, k, s, colorStreak, currentColor, startStreak, gem, scent;
		for(i = 0; i < jsonData.game.columns; i++){
			colorStreak = 1;
			currentColor = -1;
			startStreak = 0;
			for(j = 0; j < jsonData.game.rows; j++){ 
				gem = this.gemAt.call(this, i, j);
				if(typeof gem === 'undefined'){
					continue;
				}
				if(gem.orbColor == currentColor){
					colorStreak++;
				}
				if(gem.orbColor != currentColor || j == jsonData.game.columns - 1){
					if(colorStreak >= 3){
						game.add.audio(colorStreak === 3 ? 'match_3' : 'match_4').play();
						type = "" + this.possibleTypes[currentColor];
						if(colorStreak === 4 || colorStreak === 5){
							scent = jsonData.scents[jsonData[type.indexOf('_Nom_') >= 0 ? 'noms' : 'nums'][type].scent].icon;
							for(s = 0; s < colorStreak; s++){
								this.scentIconBurst.call(this, startStreak + s, i, scent);
							}
						}
						game.track.event('game', 'match', colorStreak);
						game.track.event('game', 'collected', type);
						game.settings.addCollected.call(this, type);
						this.queueProgress.call(this, type, colorStreak);
						for(k = 0; k < colorStreak; k++){
							this.removeMap[i][startStreak + k]++;
						}
					}
					startStreak = j;
					colorStreak = 1;
					currentColor = this.gemAt.call(this, i, j).orbColor;
				}
			}
		}
	},
	scentIconBurst: function(col, row, scent){
		var burst = game.make.sprite(
			col * jsonData.game.icon.w + jsonData.game.grid_offset.x + jsonData.game.icon.w * 0.5,
			row * jsonData.game.icon.h + jsonData.game.grid_offset.y + jsonData.game.icon.h * 0.5,
			jsonData.sheet.game, 'scents/' + scent);
		burst.anchor.setTo(0.5);
		burst.alpha = 0;
		burst.scale.setTo(0.01);
		game.add.tween(burst)
			.to({alpha: 1}, 200, Phaser.Easing.Quadratic.Out)
			.to({
				alpha: 0, 
				x: jsonData.game.grid_offset.x + jsonData.game.icon.w * jsonData.game.columns * 0.5
			}, 300, Phaser.Easing.Quadratic.In, false, 600)
			.start()
			.onComplete.add(function(obj, tween){
				obj.destroy();
			}, this);
		game.add.tween(burst)
			.to({
				y: jsonData.game.grid_offset.y + jsonData.game.icon.h * jsonData.game.rows * 0.5
			}, 300, Phaser.Easing.Quintic.In, true, 800);
		game.add.tween(burst.scale)
			.to({x: 0.6, y: 0.6}, game.rnd.between(300, 1200), Phaser.Easing.Elastic.Out, true);
		this.effectsGroup.addChild(burst);
	},
	handleNoRemainingMatches: function(){
		this.destroyOrbs.call(this, true);
		this.reshuffle.alpha = 0;
		game.add.tween(this.reshuffle).to({alpha: 1}, 500, Phaser.Easing.Quadratic.Out)
			.to({alpha: 0}, 500, Phaser.Easing.Quadratic.In, false, 1000)
			.start();
		game.add.tween(this.reshuffle.scale).from({x: 0.5, y: 0.5}, 500, Phaser.Easing.Quadratic.Out, true);
		this.reshuffle.bringToTop();
	},
	destroyOrbs: function(destroyAll){
		var i, j, scoreSprite,
			destroyed = 0,
			scoreSpriteLargerDim,
			scoreSpriteWidth,
			scoreSpriteHeight,
			orb;
		this.cancelSuggestion.call(this);

		for(i = 0; i < jsonData.game.rows; i++){
			for(j = 0; j < jsonData.game.columns; j++){
				if(destroyAll || this.removeMap[i][j] > 0){
					orb = this.gameArray[i][j];
					if(orb && orb.orbSprite){
						game.add.tween(orb.orbSprite)
							.to({
								alpha: 0
							}, jsonData.game.destroy_speed, Phaser.Easing.Cubic.In, true)
							.onComplete.add(function(orb){
								orb.destroy();
								destroyed--;
								if(destroyed == 0){
									this.makeOrbsFall.call(this);
									if(this.fastFall){
										this.replenishField.call(this);
									}
								}
							}, this);
					}
					destroyed++;
					this.gameArray[i][j] = null;
				}
			}
		}
	},
	makeOrbsFall: function(){
		var i, j, fallTiles,
			fallen = 0,
			restart = false,
			orb, orb2Tween;
		this.cancelSuggestion.call(this);
		for(i = jsonData.game.rows - 2; i >= 0; i--){
			for(j = 0; j < jsonData.game.columns; j++){
				if(this.gameArray[i][j] != null){
					fallTiles = this.holesBelow.call(this, i, j);
					if(fallTiles > 0){
						if(!this.fastFall && fallTiles > 1){
							fallTiles = 1;
							restart = true;
						}
						orb = this.gameArray[i][j];
						orb2Tween = game.add.tween(orb.orbSprite)
							.to({
								y: orb.orbSprite.y + fallTiles * jsonData.game.icon.h
							}, jsonData.game.fall_speed + game.rnd.between(0, 200), Phaser.Easing.Bounce.Out, true)
							.onComplete.add(function(target, tween){
								fallen--;
								if(fallen == 0){
									if(restart){
										this.makeOrbsFall.call(this);
									}else if(!this.fastFall){
										this.replenishField.call(this);
									}
								}
							}, this);
						orb2Tween.orb = orb;
						orb2Tween.row = i;
						orb2Tween.col = j;
						fallen++;
						this.gameArray[i + fallTiles][j] = {
							orbSprite: this.gameArray[i][j].orbSprite,
							orbColor: this.gameArray[i][j].orbColor
						}
						this.gameArray[i][j] = null;
					}
				}
			}
		}
		if(fallen == 0){
			this.replenishField.call(this);
		}
	},
	replenishField: function(){
		this.cancelSuggestion.call(this);
		var i, j, emptySpots, randomColor, orb, icon, orbTween,
			replenished = 0,
			restart = false;
		for(j = 0; j < jsonData.game.rows; j++){
			emptySpots = this.holesInCol.call(this, j);
			if(emptySpots > 0){
				if(!this.fastFall && emptySpots > 1){
					emptySpots = 1;
					restart = true;
				}
				for(i = 0; i < emptySpots; i++){
					randomColor = game.rnd.between(0, this.orbColors - 1);
					icon = ((('' + this.possibleTypes[randomColor]).indexOf('_Nom_') >= 0) ? "noms/" : "nums/") + this.possibleTypes[randomColor];
					orb = game.add.button(
						jsonData.game.icon.w * j + jsonData.game.icon.w * 0.5, 
						-(jsonData.game.icon.h * (emptySpots - 1 - i) + jsonData.game.icon.h * 0.5), 
						this.levelData.theme, null, this, icon, icon, icon, icon);
					this.scaleOrb.call(this, orb, 1);
					orb.rotation = Math.random() * 0.5 - 0.25;
					orb.anchor.set(0.5);
					this.orbGroup.add(orb);
					this.gameArray[i][j] = {
						orbColor: randomColor,
						orbSprite: orb
					}
					orbTween = game.add.tween(this.gameArray[i][j].orbSprite)
						.to({
							y: jsonData.game.icon.h * i + jsonData.game.icon.h / 2
						}, jsonData.game.fall_speed + game.rnd.between(0, 200), Phaser.Easing.Bounce.Out, true)
						.onComplete.add(function(target, tween){
							replenished--;
							if(replenished == 0){
								if(restart){
									this.makeOrbsFall.call(this);
								}else{
									if(this.matchInBoard.call(this)){
										this.handleMatches.call(this);
									}else{
										this.determineIfCanPick.call(this);
										this.selectedOrb = null;
										this.requestSuggestion.call(this);
									}
								}
							}
						}, this);
					orbTween.orb = this.gameArray[i][j];
					replenished++;
				}
			}
		}
	},
	holesBelow: function(row, col){
		var i, result = 0;
		for(i = row + 1; i < jsonData.game.rows; i++){
			if(this.gameArray[i][col] == null){
				result ++;
			}
		}
		return result;
	},
	holesInCol: function(col){
		var i, result = 0;
		for(i = 0; i < jsonData.game.columns; i++){
			if(this.gameArray[i][col] == null){
				result ++;
			}
		}
		return result;
	}
};