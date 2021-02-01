game.module('game.main').require('game.assets', 'game.objects').body(function() {
	var mouseup = true;
	game.createScene('Main', {
		spawnTime : 1000,
		level1 : 3,
		level2 : 6,
		level3 : 9,
		level4 : 12,
		level5 : 15,
		background : null,
		backgroundSpeed : 80,
		animationSpeed : .1,
		score : 0,
		 
		init : function() {
			this.world = new game.World(0, 0);
			lifebars.life = 3;
			lifebars.score = 0;
			// Create scaled container for pixel art
			this.mainContainer = new game.Container().addTo(this.stage);
			this.mainContainer.scale.set(4, 4);

			var bg = new game.TilingSprite('desert-backgorund-looped.png');
			bg.speed.y = this.backgroundSpeed;
			bg.addTo(this.mainContainer);
			this.background = bg;
			this.addObject(this.background);
			///////////////////////////////
			this.scoreText = new game.BitmapText('', {
				font : 'Cartoon'
			});
			this.scoreText.position.set(12, game.system.height - 75);
			this.addScore(0);
			this.stage.addChild(this.scoreText);
			/////////////////////////////
			///////////////////////////////
			this.lifeText = new game.BitmapText('', {
				font : 'Cartoon'
			});
			this.lifeText.position.set(212, game.system.height - 75);
			this.subtractLife(0);
			this.stage.addChild(this.lifeText);
			/////////////////////////////
			this.player = new game.Player();

			// Spawn new enemy every second
			this.addTimer(this.spawnTime, this.spawnEnemy.bind(this), true);
			this.spawnEnemy();
		},
		spawnPlayer : function(){
			var player = new game.Player();
			this.player = player;
			this.setTextLives();
		}
		,

		addScore : function(amount) {
			this.score += amount;
			lifebars.score  = lifebars.score +1;
			if(this.score == this.level1 || this.score == this.level2 || this.score == this.level3 || this.score == this.level4 || this.score == this.level5 ){
				this.background.speed.y = this.background.speed.y +10;
				this.spawnTime = this.spawnTime - 50;
				this.addTimer(this.spawnTime, this.spawnEnemy.bind(this), true);
			}
			this.scoreText.setText('SCORE: ' + this.score.toString());
		},

		subtractLife : function(amount) {
			 
			
			//this.player.life = this.player.life - 1;
			//this.lifeText.setText('LIVES: ' + this.player.life.toString());
			this.spawnPlayer;
			this.lifeText.setText('LIVES: ' + lifebars.life.toString());
		},

		spawnEnemy : function() {
			var enemy = new game.Enemy();
		},

		keydown : function(key) {
			if (key === 'X')
				this.player.shoot();
		},
		mousedown : function() {
			this.player.shoot();
			mouseup = false;
		},
		mouseup : function() {
			this.player.shoot();
			mouseup = true;
		},
		mousemove : function(evt) {

			if (!mouseup) {
				var x = evt.global.x;
				var y = evt.global.y;
				console.log(x, y);
				var tween = new game.Tween(this.player.body.position);
				tween.to({
					x : [this.player.body.position.x, x]
				}, 100);
				//tween.easing(game.Tween.Easing.Quadratic.InOut);
				//tween.interpolation(game.Tween.Interpolation.Bezier);
				tween.start();
			}

		},setTextLives : function() {
			//this.life = this.life - amount;
			this.lifeText.setText('LIVES: ' + lifebars.life.toString());
		}
	});
	game.createScene('DEATH', {
		life : 0,
		init : function() {
			this.world = new game.World(0, 0);

			// Create scaled container for pixel art
			this.mainContainer = new game.Container().addTo(this.stage);
			this.mainContainer.scale.set(4, 4);

			var bg = new game.TilingSprite('desert-backgorund-looped.png');
			bg.speed.y = 10;
			bg.addTo(this.mainContainer);
			this.addObject(bg);
			///////////////////////////////
			 //EndScreen_SpaceShooter.png
			var bg_ending = new game.Sprite('EndScreen_SpaceShooter.png').addTo(this.stage);
            bg_ending.position.x=0;
            bg_ending.position.y=0;
			 
			 var logo = new game.Sprite('fly_again.png').addTo(this.stage);
            logo.position.x=1300;
            logo.position.y=900;
			/////////////////////////////
			///////////////////////////////
			this.lifeText = new game.BitmapText('', {
				font : 'Cartoon'
			});
			// TEXT POSITIONS
			var score_x=1000; 
			var score_y=675;
			var lives_x=1300; 
			var lives_y=675;
			

			this.lifeText.position.set(lives_x, lives_y);
			this.setTextLives();
			this.stage.addChild(this.lifeText);
			
			 this.scoreText = new game.BitmapText('', {
				font : 'Cartoon'
			});
			
			this.scoreText.position.set(score_x, score_y);
			
			this.setTextScore();
			this.stage.addChild(this.scoreText);
			/*
			/////////////////////////////
			this.player = new game.Player();

			// Spawn new enemy every second
			this.addTimer(1000, this.spawnEnemy.bind(this), true);
			this.spawnEnemy();
			*/
		},setTextLives : function() {
			//this.life = this.life - amount;
			this.lifeText.setText('LIVES: ' + lifebars.life.toString());
		},

		mousedown : function() {

			
			// Restart game
			game.system.setScene('Main');

		},

		keydown : function(key) {
			if (key === 'SPACE') {
				
				// Restart game
				game.system.setScene('Main');
			}
		} ,setTextScore : function() {
			//this.life = this.life - amount;
			this.scoreText.setText('SCORE: ' + lifebars.score.toString());
		}
	});

});

/*
 swipe: function(dir) {

 //var x_amount = game.system.width/2;
 var x_amount = game.system.width/6;
 var tween_time = 3000;
 if(dir=="right"){
 var tween = new game.Tween(this.player.body.position);
 tween.to({
 x:[this.player.body.position.x, this.player.body.position.x+x_amount]
 },tween_time);
 tween.easing(game.Tween.Easing.Quadratic.InOut);
 tween.interpolation(game.Tween.Interpolation.Bezier);
 tween.start();
 }
 if(dir=="left"){
 var tween = new game.Tween(this.player.body.position);
 tween.to({
 x:[this.player.body.position.x, this.player.body.position.x-x_amount]

 },tween_time);
 tween.easing(game.Tween.Easing.Quadratic.InOut);
 tween.interpolation(game.Tween.Interpolation.Bezier);
 tween.start();
 }
 }*/
