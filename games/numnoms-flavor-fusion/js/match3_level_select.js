var StateLevelSelect = function(game){};
StateLevelSelect.prototype = {
	preload: function(){
		game.track.screen('map');
		this.startTime = game.time.time;
		game.load.bitmapFont('brady_bunch_remastered', 'assets/fonts/brady_bunch_remastered.png', 'assets/fonts/brady_bunch_remastered.fnt');
		game.add.existing(loading);
	},
	create: function(){
		game.world.remove(loading);
		var i, ln, parent, child, text, title, levelData, levelTheme, mapIcon, path, centerX, centerY, lock, truck, progress;
		this.initScroll.call(this);
		this.parent = game.add.graphics();
		this.parent.x = jsonData.map.scroll.x;
		this.parent.y = jsonData.map.scroll.min_y;
		this.children = [];
		this.scrolling = false;
		this.scrollStart = 0;

		this.arrowUp = game.add.button(game.world.centerX, 174, jsonData.sheet.game, this.requestArrowScrollUp, this, 
			'state_map/map_arrow_over', 'state_map/map_arrow_up', 'state_map/map_arrow_down', 'state_map/map_arrow_up');
		this.arrowDown = game.add.button(game.world.centerX, 669, jsonData.sheet.game, this.requestArrowScrollDown, this, 
			'state_map/map_arrow_over', 'state_map/map_arrow_up', 'state_map/map_arrow_down', 'state_map/map_arrow_up');

		jsonData.map.confetti.forEach(function(confettiData, index){
			var confetti = game.make.sprite(
				confettiData.x - jsonData.map.scroll.x, 
				confettiData.y, 
				jsonData.sheet.game, 'state_map/confetti_' + confettiData.t),
				collectedCount;
			confetti.confettiIndex = index;
			confetti.anchor.setTo(0.5);
			confetti.angle = confettiData.r;
			confetti.scale.setTo(confettiData.h, confettiData.v);
			this.parent.addChild(confetti);
			this.confettiGhost.call(this, confetti);
		}, this);
		this.parent.inputEnabled = true;
		style = { font: "bold 14px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		// console.log(`match3_level_select.js: create: jsonData.levels.length: ${jsonData.levels.length}`)
		for(i = 0, ln = jsonData.levels.length; i < ln; i++){
			centerX = Math.floor(i % 2) === 0 ? 157 : 607;
			centerY = i * 117 + 140 + (i >= jsonData.levels.length - 1 ? 25 : 0);	// Small offset down for last level
			levelData = jsonData.levels[i];
			levelTheme = jsonData.themes[levelData.theme];
			// console.log("match3_level_select.js: create: levelTheme.map.sprite:", levelTheme.map.sprite)
			// console.log(`match3_level_select.js: create: levelData.theme: ${levelData.theme}, jsonData:`, jsonData)
			mapIcon = levelTheme.map.sprite;
			child = game.make.button(centerX, centerY, jsonData.sheet.game, this.handleLevelSelected, this, mapIcon, mapIcon, mapIcon, mapIcon);
			child.setSounds(game.sounds.over, null, game.sounds.click_2);
			if(i === 0){
				path = game.make.sprite(centerX + 166, centerY + 21, jsonData.sheet.game, 'state_map/map_path_first');
				path.anchor.setTo(0.5);
				this.parent.addChild(path);
			}else if(i >= jsonData.levels.length - 1){
				// No path to add
			}else if(i % 2 == 0){
				path = game.make.sprite(centerX + 170, centerY + levelTheme.map.level.y - 10, jsonData.sheet.game, 'state_map/map_path');
				path.anchor.setTo(0.5);
				this.parent.addChild(path);
			}else{
				path = game.make.sprite(centerX - 170, centerY + levelTheme.map.level.y - 10, jsonData.sheet.game, 'state_map/map_path');
				path.anchor.setTo(0.5);
				path.scale.x *= -1;
				this.parent.addChild(path);
			}
			child.anchor.setTo(0.5);
			if(i > game.settings.getMaxLevel()){
				child.input.enabled = false;
			}
			collectedCount = this.getCollectedCount.call(this, i),
				levelSubText = '';
			if(collectedCount.collected < collectedCount.max){
				levelSubText = collectedCount.collected + '/' + collectedCount.max + ' collected'
			}else{
				levelSubText = 'All collected!';
			}
			progress = game.make.bitmapText(0, child.height / 2 + 17, 'brady_bunch_remastered', levelSubText, 26);
			progress.anchor.setTo(0.5, 0.35);
			progress.tint = 0xeb3b80;
			child.addChild(progress);
			progress.alpha = 0;
			/*
			if(1){
				// Meh.
			}else if(i > game.settings.getMaxLevel() || (!this.isLevelRandom(i) && collectedCount.collected < collectedCount.max)){
				progress.alpha = 0;
			}else if(collectedCount.collected >= collectedCount.max){
				child.progress = progress;
				progress.alpha = 0;
				progress.scale.setTo(0.5);
				child.events.onInputOver.add(function(target){
					target.progress.scale.setTo(0.5);
					game.add.tween(target.progress)
						.to({alpha: 1}, 250, Phaser.Easing.Quadratic.Out, true);
					game.add.tween(target.progress.scale)
						.to({x: 1, y: 1}, 750, Phaser.Easing.Elastic.Out, true);
				});
				child.events.onInputOut.add(function(target){
					game.add.tween(target.progress)
						.to({alpha: 0}, 250, Phaser.Easing.Quadratic.In, true);
					game.add.tween(target.progress.scale)
						.to({x: 0.5, y: 0.5}, 500, Phaser.Easing.Quintic.Out, true);
				});
			}
			*/
			child.index = i;
			text = game.make.bitmapText(
				levelTheme.map.level.x - child.width * 0.5, 
				levelTheme.map.level.y - child.height * 0.5 + 5, 
				'brady_bunch_remastered', "" + levelData.subtitle, 30);
			text.anchor.setTo(0.5);
			text.tint = 0xeb3b80;
			child.addChild(text);
			this.parent.addChild(child);
			if(i == game.settings.getMaxLevel()){
				if(i % 2 == 0){
					truck = game.make.sprite(170, -7, jsonData.sheet.game, 'state_map/map_truck_left');
				}else{
					truck = game.make.sprite(-175, 14, jsonData.sheet.game, 'state_map/map_truck_right');
				}
				truck.anchor.setTo(0.5);
				child.addChild(truck);
			}else if(i > game.settings.getMaxLevel()){
				lock = game.make.sprite(62, levelTheme.map.level.y - child.height * 0.5, jsonData.sheet.game, 'state_map/map_lock');
				lock.anchor.setTo(0.5);
				child.addChild(lock);
			}
			this.children.push(child);
			this.addOverScaling(child);
		}

		this.bg = game.add.sprite(game.world.centerX, game.world.centerY, jsonData.sheet.game, 'state_map/map_bg_overlay');
		this.logo = game.add.sprite(0, 0, jsonData.sheet.game, 'state_map/map_logo');

		this.collection = game.add.button(
			jsonData.game.collection_button.x, 
			jsonData.game.collection_button.y, 
			jsonData.sheet.game, this.handleCollectionClick, this, 
			'state_map/map_collection_over', 'state_map/map_collection_up', 'state_map/map_collection_down', 'state_map/map_collection_up');
		this.collection.setSounds(game.sounds.over, null, game.sounds.click);
		this.collection.anchor.setTo(0.5);

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
		collectedText = game.add.bitmapText(
			jsonData.game.collection_button.text.x, 
			jsonData.game.collection_button.text.y, 
			'brady_bunch_remastered', collectedCount + ' / ' + collectedMax, 30);
		collectedText.anchor.setTo(0.5);
		collectedText.tint = 0xeb3b80;
		collectedText.angle = jsonData.game.collection_button.text.r;
		this.collection.addChild(collectedText);

		this.bg.alpha = this.logo.alpha = this.collection.alpha = this.parent.alpha = 1;
		this.bg.anchor.setTo(0.5);

		game.add.tween(this.logo).from({alpha: 0}, 200, Phaser.Easing.Quadratic.In, true, 0);
		game.add.tween(this.logo).from({y: '50'}, 1500, Phaser.Easing.Elastic.Out, true, 0);
		game.add.tween(this.bg.scale).from({x: 1.2, y: 1.2}, 1000, Phaser.Easing.Quadratic.Out, true, 0);
		game.add.tween(this.collection).from({alpha: 0}, 1000, Phaser.Easing.Quadratic.In, true, 0);
		game.add.tween(this.collection).from({x: '+50'}, 1000, Phaser.Easing.Back.Out, true, 0);

		var border = game.add.graphics(0, 0);
		border.lineStyle(10, 0xEB3B80, 1);
		border.drawRect(5, 5, 950, 710);
		game.input.addMoveCallback(this.handleInputMove, this);

//		this.arrowUp = game.add.button(game.world.centerX, 174, jsonData.sheet.game, this.requestArrowScrollUp, this, 
//			'state_map/map_arrow_over', 'state_map/map_arrow_up', 'state_map/map_arrow_down', 'state_map/map_arrow_up');
		this.arrowUp.setSounds(game.sounds.over, null, game.sounds.click);
		this.arrowUp.anchor.setTo(0.5);
		this.arrowUp.scale.y = -1;
		this.arrowUp.alpha = 0;
//		this.arrowDown = game.add.button(game.world.centerX, 669, jsonData.sheet.game, this.requestArrowScrollDown, this, 
//			'state_map/map_arrow_over', 'state_map/map_arrow_up', 'state_map/map_arrow_down', 'state_map/map_arrow_up');
		this.arrowDown.setSounds(game.sounds.over, null, game.sounds.click);
		this.arrowDown.anchor.setTo(0.5);

		game.time.events.add(500, function(){
			this.scrollToLevel(currentLevelIndex);
		}, this);
		this.addOverScaling([this.arrowUp, this.arrowDown, this.collection]);
		this.addOverScaling(this.children);
		game.add.existing(overlay);
		game.track.timing('state', 'init', game.time.time - this.startTime, 'map');
	},
	confettiGhost: function(confetti){
		var originalScale = {x: confetti.scale.x, y: confetti.scale.y};
		game.time.events.add(game.rnd.between(5000, 60000), function(confetti){
			var scale = game.rnd.pick([0.95, 1.05]),
				duration = game.rnd.between(2000, 5000);
			game.add.tween(confetti)
				.to({angle: game.rnd.pick(['-', '+']) + game.rnd.between(1, 8)}, duration, Phaser.Easing.Back.InOut, true, 0, 0, true)
				.onComplete.add(this.confettiGhost, this, 0, confetti);
			game.add.tween(confetti.scale)
				.to({x: scale * originalScale.x, y: scale * originalScale.y}, duration * 0.5, Phaser.Easing.Quadratic.InOut, true, 0, 0, true);
		}, this, confetti);
	},
	isLevelRandom: function(value){
		if(typeof value === 'undefined'){
			value = currentLevelIndex;
		}
		return (jsonData.levels[value].flags & 0x01);
	},
	shutdown: function(){
		game.world.remove(overlay);
	},
	isArray: function(what){
		return Object.prototype.toString.call(what) === '[object Array]';
	},
	getCollectedCount: function(levelIndex){
		var collectedCount = 0,
			collectedMax = 0,
			key, collectedText;
		for(key in jsonData.nums){
			if(typeof jsonData.nums[key].page === 'undefined' || jsonData.nums[key].page === '' || jsonData.nums[key].page < 0){
				continue;
			}
			if(jsonData.levels[levelIndex].recipe.indexOf(key) < 0){
				continue;
			}
			collectedMax++;
			if(game.settings.hasCollected.call(this, key)){
				collectedCount++;
			}
		}
		return { collected: collectedCount, max: collectedMax };
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
				game.add.tween(target.scale).to({ x: 1 * negativeX, y: 1 * negativeY }, 400, Phaser.Easing.Quadratic.InOut, true);
			}, this);
		}
	},
	scrollToLevel: function(levelIndex){
		this.requestScroll.call(this, -jsonData.map.scroll.scroll_y * (levelIndex - 1));
	},
	requestArrowScrollUp: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		this.requestScroll.call(this, jsonData.map.scroll.scroll_y * 4);
		this.arrowTween = true;
	},
	requestArrowScrollDown: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		this.requestScroll.call(this, -jsonData.map.scroll.scroll_y * 4);
		this.arrowTween = true;
	},
	initScroll: function(){
		var scrollBounds = new Phaser.Rectangle(jsonData.map.scroll.x, jsonData.map.scroll.min_y, 0, jsonData.map.scroll.max_y - jsonData.map.scroll.min_y),
			scrollAreaGraphic = game.make.graphics();
		scrollAreaGraphic.drawRect(0, 0, 763, 622);
		this.scrollArea = game.add.sprite(100, 96, scrollAreaGraphic.generateTexture());
		game.input.onDown.add(this.handleInputDown, this);
		game.input.onUp.add(this.handleInputUp, this);
		game.input.mouse.mouseWheelCallback = this.handleMouseWheel.bind(this);
		this.inputDown = false;
		this.lastY = 0;
		this.vY = 0;
	},
	handleInputDown: function(e){
		this.inputDown = true;
		this.lastY = this.scrollStart = game.input.y;
	},
	handleInputUp: function(e){
		if(!this.inputDown){
			return;
		}
		this.inputDown = false;
		this.vY = game.input.y - this.lastY;
	},
	handleInputMove: function(pointer, x, y){
		if(this.inputDown){
			this.parent.y += game.input.y - this.lastY;
			this.vY = 0;
		}
	},
	update: function(e){
		var upAlpha, downAlpha;
		if(this.inputDown){
			this.lastY = game.input.y;
		}else{
			this.parent.y += this.vY;
			this.vY *= 0.96;
		}
		this.parent.y = game.math.clamp(this.parent.y, jsonData.map.scroll.max_y, jsonData.map.scroll.min_y);

		upAlpha = this.parent.y >= jsonData.map.scroll.min_y - 10 ? 0 : 1;
		downAlpha = this.parent.y <= jsonData.map.scroll.max_y + 10 ? 0 : 1;

		if(this.arrowUp.targetAlpha !== upAlpha){
			this.arrowUp.targetAlpha = upAlpha;
			this.tweenAlpha.call(this, this.arrowUp, upAlpha);
			this.arrowUp.enabled = upAlpha === 1;
		}

		if(this.arrowDown.targetAlpha !== downAlpha){
			this.arrowDown.targetAlpha = downAlpha;
			this.tweenAlpha.call(this, this.arrowDown, downAlpha);
			this.arrowDown.enabled = downAlpha === 1;
		}
	},
	handleMouseWheel: function(e){
		if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP){
			game.track.event('map', 'scroll', 'up');
			this.requestScroll.call(this, jsonData.map.scroll.scroll_y);
		}else if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN){
			game.track.event('map', 'scroll', 'down');
			this.requestScroll.call(this, -jsonData.map.scroll.scroll_y);
		}
	},
	requestScroll: function(value, instant){
		var targetY, distance;
		if(this.scrolling){
			return;
		}
		this.scrolling = true;
		targetY = this.parent.y + value;
		if(!instant){
			game.track.event('map', 'scroll', value < 0 ? 'up' : 'down');
		}
		if(targetY > jsonData.map.scroll.min_y){
			targetY = jsonData.map.scroll.min_y;
		}else if(targetY < jsonData.map.scroll.max_y){
			targetY = jsonData.map.scroll.max_y;
		}
		if(instant){
			this.parent.y = targetY;
			game.scrolling = false;
		}else{
			distance = Math.max(Math.abs(targetY - this.parent.y), 1);
			var scrollDuration = Math.min(distance * 0.5, 3000);
			game.add.tween(this.parent).to({y: targetY}, scrollDuration, Phaser.Easing.Quadratic.InOut, true);
			game.time.events.add(scrollDuration, function(){
				this.scrolling = false;
			}, this);
		}
		this.arrowUp.targetAlpha = targetY >= jsonData.map.scroll.min_y - 10 ? 0 : 1;
		this.arrowDown.targetAlpha = targetY <= jsonData.map.scroll.max_y + 10 ? 0 : 1;
	},
	tweenAlpha: function(target, alpha){
		if(typeof target.tween !== 'undefined'){
			if(target.tween.properties.alpha == alpha){
				return;
			}
		}
		target.tween = game.add.tween(target).to({alpha: alpha}, 200, Phaser.Easing.Quadratic.InOut, true);
	},
	handleCollectionClick: function(e, pointer, releasedOnButton){
		if(!releasedOnButton){
			return;
		}
		game.track.event('map', 'click', 'collection_button');
		game.state.start("Collection");
	},
	handleLevelSelected: function(e, pointer, releasedOnButton){
		if(!releasedOnButton || Math.abs(this.scrollStart - game.input.y) > 20){	// If the user scrolled more than 20px...
			return;
		}
		currentLevelIndex = e.index;
		game.track.event('map', 'click', currentLevelIndex + 1);
		game.state.start("Game");
	}
}