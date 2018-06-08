var jsonData, currentLevelIndex, game, overlay, loading,
	statesToWaitFor = [
		'StateLoading',
		'StateIntro',
		'StateLevelSelect',
		'StateCollection',
		'StateGame'];

window.onload = function() {
	game = new Phaser.Game(960, 720, Phaser.AUTO, '#canvas-container', {
		preload: function(){
			game.track = {
				event: function(eventCategory, eventAction){
					var i, ln,
						args = ['send', 'event', 'Flavor Fusion', eventCategory + '_' + eventAction];
					for(i = 2, ln = arguments.length; i < ln; ++i){
						args.push(arguments[i]);
					}
					ga.apply(this, args);
				},
				screen: function(screenName){
					ga('send', 'screenview', {
						screenName: screenName
					});
				},
				timing: function(category, type, value){
					var i, ln,
						args = ['send', 'timing', category, type, value];
					for(i = 5, ln = arguments.length; i < ln; ++i){
						args.push(arguments[i]);
					}
					ga.apply(this, args);
				},
				init: function(name){
					ga('set', 'appName', name);
					ga('set', 'page', '/en-us/flavorfusion');	/* MGA_CHECK */
					ga('send', 'pageview', '/en-us/flavorfusion');	/* MGA_CHECK */
				}
			};
			game.track.init('com.mgae.numnoms.flavorfusion');
			game.track.screen('preload');
			this.startTime = game.time.time;
			game.scale.pageAlignHorizontally = game.scale.pageAlignVertically = true;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.load.atlasJSONHash('loading', 'assets/spritesheets/loading.png', 'assets/spritesheets/loading.json');
			this.text = game.add.text(game.world.centerX, game.world.centerY, 'Loading 0%').addColor('#eb1d59', 0);
			this.text.anchor.setTo(0.5);
			this.sounds = {
				begin_level: ['assets/audio/begin_level.mp3', 'assets/audio/begin_level.aif'],
				click: ['assets/audio/btn_click.mp3', 'assets/audio/btn_click.aif'],
				click_2: ['assets/audio/btn_click_2.mp3', 'assets/audio/btn_click_2.aif'],
				finish_level: ['assets/audio/finish_level.mp3', 'assets/audio/finish_level.aif'],
				match_3: ['assets/audio/match_3.mp3', 'assets/audio/match_3.aif'],
				match_4: ['assets/audio/match_4.mp3', 'assets/audio/match_4.aif'],
				over: ['assets/audio/btn_over.mp3', 'assets/audio/btn_over.aif'],
				soundtrack: ['assets/audio/soundtrack.mp3', 'assets/audio/soundtrack.aif'],
				swap: ['assets/audio/swap.mp3', 'assets/audio/swap.aif']
			};
			for(var key in this.sounds){
				game.load.audio(key, this.sounds[key]);
			}
		},
		init: function(){
			game.sound.boot();
		},
		loadUpdate: function(){
			this.text.setText('Loading ' + game.load.progress + '%');
		},
		create: function(){
			game.sounds = {};
			for(var key in this.sounds){
				game.sounds[key] = game.make.audio(key);
			}
			this.text.destroy();
			game.track.timing('state', 'init', game.time.time - this.startTime, 'preload');
			this.checkForStates.call(this);
		},
		checkForStates: function(){
			var missing = false;
			statesToWaitFor.forEach(function(state){
				if(typeof window[state] === 'undefined'){
					missing = true;
				}
			}, this);
			if(missing){
				game.time.events.add(Phaser.Timer.SECOND, this.checkForStates, this);
			}else{
				this.delayedStart.call(this);
			}
		},
		delayedStart: function(){
			var logo, loadingText, i, child, parent, 
				icons = [],
				iconDistance = 100,
				iconCount = 12,
				lastTime = Date.now();
			loading = game.add.sprite();
			logo = game.make.sprite(game.world.centerX, game.world.centerY, 'loading', 'loading_logo');
			loadingText = game.make.sprite(game.world.centerX, game.world.centerY, 'loading', 'loading_text');
			logo.anchor.setTo(0.5);
			loadingText.anchor.setTo(0.5);
			var border = game.make.graphics(0, 0);
			border.lineStyle(10, 0xEB3B80, 1);
			border.drawRect(5, 5, 950, 710);
			parent = game.make.sprite(game.world.centerX, game.world.centerY);
			for(i = 0; i < iconCount; i++){
				child = game.make.sprite(
					Math.cos(i * game.math.PI2 / iconCount) * iconDistance, 
					Math.sin(i * game.math.PI2 / iconCount) * iconDistance);
				icon = game.make.sprite(0, 0, 'loading', 'loading_' + i);
				icon.anchor.setTo(0.5);
				child.addChild(icon);
				child.addChild(icon);
				parent.addChild(child);
			}
			requestAnimationFrame(rotate);
			addChildren(loading, [parent, logo, loadingText, border]);
			game.state.add('Loading', StateLoading);
			game.state.start('Loading');
			function rotate(){
				if(game.world.contains(loading)){
					var degrees = (Date.now() - lastTime) * 0.05;
					parent.angle += degrees;
					parent.children.forEach(function(child){
						child.angle -= degrees;
					}, this);
					lastTime = Date.now();
					requestAnimationFrame(rotate);
				}else{
					setTimeout(rotate, 100);
				}
			}
			function addChildren(parent, children){
				children.forEach(function(child){
					parent.addChild(child);
				}, this);
			}
		},
		shutdown: function(){
			game.world.remove(loading);
		}
	}, true, true);
};