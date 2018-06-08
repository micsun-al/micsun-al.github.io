var StateCollection = function(game){};
StateCollection.prototype = {
	preload: function(){
		game.track.screen('collection');
		this.startTime = game.time.time;
		game.add.existing(loading);
		game.load.atlasJSONHash('collectionsheet4', 'assets/spritesheets/collectionsheet4.png', 'assets/spritesheets/collectionsheet4.json');
	},
	create: function(){
		this.currentPage = 0;
		this.currentScroll = null;
		this.initGraphics.call(this);
		this.startAnimations.call(this);
		game.add.existing(overlay);
		game.world.remove(loading);
		this.swipe = new Swipe(game, {
			left: this.requestNextPage.bind(this),
			upLeft: this.requestNextPage.bind(this),
			downLeft: this.requestNextPage.bind(this),
			right: this.requestPreviousPage.bind(this),
			upRight: this.requestPreviousPage.bind(this),
			downRight: this.requestPreviousPage.bind(this)
		});
	},
	update: function(){
		this.swipe.check();
	},
	shutdown: function(){
		game.world.remove(overlay);
	},
	initGraphics: function(){
		var i, ln, page;
		this.bg = game.add.sprite(game.world.centerX, game.world.centerY, jsonData.sheet.collection, 'state_collection/collection_bg');
		this.bg.anchor.setTo(0.5);
		this.collection = game.add.sprite(0, 0, jsonData.sheet.collection, 'state_collection/collection_title');

		var collectedCount = 0,
			collectedMax = 0,
			key, collectedText;
		for(key in jsonData.nums){
			if(jsonData.nums[key].page < 0){
				continue;
			}
			collectedMax++;
			if(game.settings.hasCollected.call(this, key)){
				collectedCount++;
			}
		}
		collectedText = game.add.bitmapText(
			jsonData.game.collection_button.x + jsonData.game.collection_button.text.x, 
			jsonData.game.collection_button.y + jsonData.game.collection_button.text.y, 
			'brady_bunch_remastered', collectedCount + ' / ' + collectedMax, 30);
		collectedText.anchor.setTo(0.5);
		collectedText.tint = 0xeb3b80;
		collectedText.angle = jsonData.game.collection_button.text.r;
		this.collection.addChild(collectedText);
		this.flairTopLeft = game.add.sprite(94, 93, jsonData.sheet.collection, 'state_collection/collection_flair_top_left');
		this.flairTopLeft.anchor.setTo(0.5);
		this.flairBottomRight = game.add.sprite(878, 591, jsonData.sheet.collection, 'state_collection/collection_flair_bottom_right');
		this.flairBottomRight.anchor.setTo(0.5);
		this.collectionPages = [];

		for(i = 0, ln = 19; i < ln; i++){
			this.collectionPages.push(game.make.sprite(game.world.width * i + game.world.centerX, game.world.centerY, jsonData.sheet.collection, 'state_collection/collection_bg' + i));
		}

		for(i = 0, ln = this.collectionPages.length; i < ln; i++){
			page = this.collectionPages[i];
			page.anchor.setTo(0.5);
			page.scale.setTo(0.8);
			page.alpha = 0;
		}
		this.pageParent = game.add.group();
		this.pageParent.x = game.world.width;
		this.collectionPages.forEach(function(page){
			this.pageParent.addChild(page);
		}, this);
		this.logo = game.add.sprite(0, 0, jsonData.sheet.game, 'state_map/map_logo');
		this.logo.inputEnabled = true;
		this.logo.events.onInputDown.add(this.handleLogoClick, this);
		this.arrowRight = game.add.button(918, 364, jsonData.sheet.collection, this.requestNextPage, this,
			'state_collection/collection_arrow_right_over', 'state_collection/collection_arrow_right_up', 'state_collection/collection_arrow_right_down', 'state_collection/collection_arrow_right_up');
//		this.arrowRight.setSounds(game.sounds.over, null, game.sounds.click);
		this.arrowRight.anchor.setTo(0.5);
		this.arrowLeft = game.add.button(38, 364, jsonData.sheet.collection, this.requestPreviousPage, this,
			'state_collection/collection_arrow_right_over', 'state_collection/collection_arrow_right_up', 'state_collection/collection_arrow_right_down', 'state_collection/collection_arrow_right_up');
//		this.arrowLeft.setSounds(game.sounds.over, null, game.sounds.click);
		this.arrowLeft.anchor.setTo(0.5);
		this.arrowLeft.scale.setTo(-1, 1);
		var border = game.add.graphics(0, 0);
		border.lineStyle(10, 0xEB3B80, 1);
		border.drawRect(5, 5, 950, 710);
		this.closeBtn = game.add.button(933, 27, jsonData.sheet.game, this.handleCloseClick, this, 
			'shared/close_over', 'shared/close_up', 'shared/close_down', 'shared/close_up');
		this.closeBtn.setSounds(game.sounds.over, null, game.sounds.click);
		this.closeBtn.anchor.setTo(0.5);
		this.addOverScaling.call(this, [this.arrowRight, this.arrowLeft, this.closeBtn]);
		for(var key in jsonData.nums){
			if(jsonData.nums[key].page < 0 || !game.settings.hasCollected.call(this, key)){
				continue;
			}
			this.collectionPages[jsonData.nums[key].page]
				.addChild(game.make.sprite(
					-game.world.centerX, 
					-game.world.centerY, 
					jsonData.sheet.collection, 'collected/' + key));
		}
		game.track.timing('state', 'init', game.time.time - this.startTime, 'collection');
	},
	handleLogoClick: function(target, pointer){
		if(pointer.x < 538 || pointer.x > 610 || pointer.y > 54){
			return;
		}
		if(typeof this.logoClickCount === 'undefined'){
			this.logoClickCount = -1;
			Phaser.ArrayUtils.shuffle(jsonData.credits.names);
		}else{
			this.logoClickCount++;
		}

		var name = game.make.bitmapText(0, 0,
				'brady_bunch_remastered', 
				this.logoClickCount < 0 ? 'Credits' : jsonData.credits.names[this.logoClickCount % jsonData.credits.names.length], 
				30),
			burst = game.add.sprite(
				game.rnd.between(name.width, game.world.width - name.width), 
				game.rnd.between(name.height, game.world.height - name.height)),
			bg = game.make.sprite(0, 0, jsonData.sheet.game, 'state_game/name_container'),
			duration = game.rnd.between(2000, 5000),
			scale = game.rnd.between(1.05, 2);
		name.anchor.setTo(0.5);
		bg.anchor.setTo(0.5, 0.625);
		burst.addChild(bg);
		burst.addChild(name);
		burst.inputEnabled = false;
		burst.alpha = 0;
		burst.angle = game.rnd.between(-3, 3);
		bg.tint = game.rnd.between(0, 0xffffff);
		game.add.tween(burst)
			.to({
				x: game.rnd.between(name.width, game.world.width - name.width), 
				y: game.rnd.between(name.height, game.world.height - name.height)
			}, duration - 250, Phaser.Easing.Quintic.In, false, 250)
			.start()
			.onComplete.add(function(target){
				burst.destroy();
			});
		game.add.tween(burst)
			.to({alpha: 1}, 500, Phaser.Easing.Quadratic.Out, false)
			.to({alpha: 0}, 500, Phaser.Easing.Quadratic.In, false, duration - 1000)
			.start();
		game.add.tween(burst.scale)
			.to({x: scale, y: scale}, duration * game.rnd.between(1, 1.2), Phaser.Easing.Quadratic.InOut, true, 250, 0, true);
		name.scale.setTo(game.rnd.between(2, 4));
		game.add.tween(name.scale)
			.to({x: 1, y: 1}, game.rnd.between(500, 900), Phaser.Easing.Elastic.Out, true);
	},
	handleCloseClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		game.track.event('collection', 'click', 'close');
		game.state.start('LevelSelect');
	},
	requestNextPage: function(e, pointer, releasedOnButton){
		if(arguments.length >= 3 && !releasedOnButton){
			return;
		}
		game.track.event('collection', 'click', 'next_page');
		this.requestPage(this.currentPage + 1);
	},
	requestPreviousPage: function(e, pointer, releasedOnButton){
		if(arguments.length >= 3 && !releasedOnButton){
			return;
		}
		game.track.event('collection', 'click', 'previous_page');
		this.requestPage(this.currentPage - 1);
	},
	requestPage: function(index){
		var i, ln, scale, page;
		game.sounds.click.play();
		if(this.currentScroll){
			this.currentScroll.stop();
		}
		this.currentPage = game.math.wrap(index, 0, this.collectionPages.length);
		this.currentScroll = game.add.tween(this.pageParent).to({x: this.currentPage * -game.world.width}, 500, Phaser.Easing.Quadratic.InOut, true);
		for(i = 0, ln = this.collectionPages.length; i < this.collectionPages.length; i++){
			page = this.collectionPages[i];
			game.add.tween(page).to({ alpha: this.currentPage === i ? 1 : 0 }, 1000, Phaser.Easing.Quadratic.InOut, true);
			scale = this.currentPage === i ? 1 : 0.8;
			game.add.tween(page.scale).to({ x: scale, y: scale }, 1000, Phaser.Easing.Elastic.Out, true);
		}
	},
	startAnimations: function(){
		game.add.tween(this.bg.scale)
			.from({x: 1.2, y: 1.2}, 1500, Phaser.Easing.Quintic.Out, true);
		game.add.tween(this.flairTopLeft)
			.from({x: this.flairTopLeft.x + 50, y: this.flairTopLeft.y + 50, alpha: 0}, 1500, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(this.flairBottomRight)
			.from({x: this.flairBottomRight.x - 50, y: this.flairBottomRight.y - 50, alpha: 0}, 1500, Phaser.Easing.Quadratic.Out, true);
		game.add.tween(this.closeBtn)
			.from({angle: game.rnd.between(-50, 50)}, 700, Phaser.Easing.Elastic.Out, true);
		this.requestPage.call(this, 0);
	},
	isArray: function(what){
		return Object.prototype.toString.call(what) === '[object Array]';
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
	}
}