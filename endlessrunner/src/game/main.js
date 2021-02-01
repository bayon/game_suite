game.module('game.main').require('game.assets', 'game.objects').body(function() {

	game.createScene('Main', {
	 	city1 : null,
	 	city2 :null,
	 	trees : null,
	 	bush : null,
	 	platform: null,
		score : 0,
		life : 3,
		
		spawnTime : 1000,
		init : function() {
			this.world = new game.World(0, 2000);
			var floorBody = new game.Body({
				position : {
					x : game.system.width / 2,
					y : game.system.height - 40
				},
				collisionGroup : 1
			});
			var floorShape = new game.Rectangle(game.system.width, 50);
			floorBody.addShape(floorShape);
			this.world.addBody(floorBody);

			var bg = new game.Sprite('01_sky_moon.png').addTo(this.stage);
			 //function(texture, pos, speed) 
			 city1 = this.addParallax('03_city.png', 150, -50);
			 city2 = this.addParallax('04_city.png', 100, -100);
			 trees = this.addParallax('05_trees.png', 100, -200);
			 bush = this.addParallax('05_bush.png', 50, -300);
			 platform = this.addParallax('platform.png', 0, -400);
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
			this.objectContainer = new game.Container().addTo(this.stage);
			this.playerContainer = new game.Container().addTo(this.stage);

			this.player = new game.Player(400, game.system.height - 400);
			this.player.sprite.addTo(this.playerContainer);

			this.addTimer(this.spawnTime, this.spawnRandomObject.bind(this), true);
			this.spawnRandomObject();
			
			
		},

		addScore : function(amount) {
			this.score += amount;
			this.scoreText.setText('SCORE: ' + this.score.toString());
			scoreboard.highscore = this.score ;
			//if(this.score > 3){console.log('ok above 3');}

		},

		subtractLife : function(amount) {
			this.life -= amount;
			this.lifeText.setText('LIVES: ' + this.life.toString());
		},

		spawnRandomObject : function() {
			var rand = Math.random();
			//console.log(rand);//random percentage
			var v_mid 		= 300;//vertical middle or game.system.height/2
			var v_plat_1 	= 850;
			var v_plat_2 	= 550;
			var v_tire 		= 910;
			var x_plat_spacing = 600;
			if (rand < 0.5) {
				var coin = new game.Coin(game.system.width, v_mid + Math.random() * v_mid);
			} else if (rand < 0.8) {
				var oneway = new game.Oneway(game.system.width, v_plat_1);
				if(rand < 0.6){
					var oneway = new game.Oneway(game.system.width+x_plat_spacing, v_plat_2);
				}
			} else {
				var tires = new game.Tires(game.system.width, v_tire);
			}
		},

		addParallax : function(texture, pos, speed) {
			var sprite = new game.TilingSprite(texture, game.system.width);
			sprite.speed.x = speed;
			sprite.position.y = game.system.height - sprite.height - pos;
			this.addObject(sprite);
			this.stage.addChild(sprite);
			return sprite;
		},

		mousedown : function() {
			this.player.jump();
		},

		keydown : function(key) {
			if (key === 'SPACE')
				this.player.jump();
		},
		 makeFaster : function() {
			var d_tree= 35;//25
			var d_bush = 40;//30
			var d_platform = 120;//100
			var d_spawn = 250;//200
			var spawn_limit = 70;//100
			trees.speed.x = trees.speed.x - d_tree;
			bush.speed.x = bush.speed.x - d_bush;
			platform.speed.x = platform.speed.x - d_platform;
			this.spawnTime = this.spawnTime - d_spawn;
			if (this.spawnTime <= spawn_limit) {
				this.spawnTime = spawn_limit;
			}
		}
	});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

	game.createScene('Celebration', {

		init : function() {
			//alert('funeral music');
			this.world = new game.World(0, 2000);
			var floorBody = new game.Body({
				position : {
					x : game.system.width / 2,
					y : game.system.height - 40
				},
				collisionGroup : 1
			});
			var floorShape = new game.Rectangle(game.system.width, 50);
			floorBody.addShape(floorShape);
			this.world.addBody(floorBody);


//var bg = new game.Sprite('EndScreen_EndlessRunner.png').addTo(this.stage);
			var logo = new game.Sprite('btn_play_again.png').addTo(this.stage);
            logo.position.x=1300;
            logo.position.y=800;

			var bg = new game.Sprite('01_sky_moon.png').addTo(this.stage);
			this.scoreText = new game.BitmapText('', {
				font : 'Cartoon'
			});
			
			//this.scoreText.position.set(24, game.system.height - 50);
			this.scoreText.position.set(game.system.height / 2, game.system.height / 2);
			this.objectContainer = new game.Container().addTo(this.stage);
			this.playerContainer = new game.Container().addTo(this.stage);
			this.addTimer(50, this.spawnCoins.bind(this), true);
			this.spawnCoins();
			this.stage.addChild(this.scoreText);
			this.scoreText.setText('Y O U   W I N  !! score:'+scoreboard.highscore+' hi :'+ session_hi+' click to play! ');
			//game.scene.addTimer(6000, function() {
				// Restart game
				//game.system.setScene('Main');
			//});
		},

		mousedown : function() {

			//this.player.jump();
			//alert('mouse down');

			// CAN REDIRECT TO HTTP BUT NOT TO LOCAL HOST
			//$(location).attr('href',"http://www.gocodigo.com");

			var host = window.location.host;
			// alert("Page location is " + window.location.href);
			// http://localhost:8888/GAMES/firstwestern/games/endlessrunner/
			var pathToIndex = "/GAMES/firstwestern/games/";
			//alert("Host is " + host + pathToIndex);
			var path = host + pathToIndex;
			// $(location).attr('href',path);
			// window.location=path;
			//window.location.assign(path);
			// Restart game
			game.system.setScene('Main');

		},

		keydown : function(key) {
			if (key === 'SPACE') {
				//this.player.jump();
				//alert('space key');
				// Restart game
				game.system.setScene('Main');
			}
		},
		spawnCoins : function() {
			var coin = new game.Coin(game.system.width, 10 + Math.random() * 1000);
		} 
	});
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////
 	game.createScene('Death', {

		init : function() {
			//alert('funeral music');
			this.world = new game.World(0, 2000);
			var floorBody = new game.Body({
				position : {
					x : game.system.width / 2,
					y : game.system.height - 40
				},
				collisionGroup : 1
			});
			var floorShape = new game.Rectangle(game.system.width, 50);
			floorBody.addShape(floorShape);
			this.world.addBody(floorBody);


			 var bg = new game.Sprite('EndScreen_EndlessRunner.jpg').addTo(this.stage);
			var logo = new game.Sprite('btn_play_again.png').addTo(this.stage);
            logo.position.x=1300;
            logo.position.y=800;
			
			
			this.scoreText = new game.BitmapText('', {
				font : 'Cartoon'
			});
			this.hiScoreText = new game.BitmapText('', {
				font : 'Cartoon'
			});
			//this.scoreText.position.set(24, game.system.height - 50);
			//1024---1920
			//console.log(game.system.height + "---"+ game.system.width);
			//this.scoreText.position.set(game.system.height / 2, game.system.width / 4);
			var score_x=1080; var score_y=700;
			this.scoreText.position.set(score_x, score_y);
			var hi_score_x=1300; var hi_score_y=700;
			this.hiScoreText.position.set(hi_score_x, hi_score_y);
			this.objectContainer = new game.Container().addTo(this.stage);
			this.playerContainer = new game.Container().addTo(this.stage);
			//this.addTimer(50, this.spawnTires.bind(this), true);
			//this.addTimer(50, this.spawnStars.bind(this), true);
			this.stage.addChild(this.scoreText);
			this.scoreText.setText('score:' + scoreboard.highscore  );
			this.stage.addChild(this.hiScoreText);
			this.hiScoreText.setText( 'high score :' + session_hi  );
			

			//game.scene.addTimer(6000, function() {
				// Restart game
				//game.system.setScene('Main');
			//});
		},

		mousedown : function() {

			//this.player.jump();
			//alert('mouse down');

			// CAN REDIRECT TO HTTP BUT NOT TO LOCAL HOST
			//$(location).attr('href',"http://www.gocodigo.com");

			var host = window.location.host;
			// alert("Page location is " + window.location.href);
			// http://localhost:8888/GAMES/firstwestern/games/endlessrunner/
			var pathToIndex = "/GAMES/firstwestern/games/";
			//alert("Host is " + host + pathToIndex);
			var path = host + pathToIndex;
			// $(location).attr('href',path);
			// window.location=path;
			//window.location.assign(path);
			// Restart game
			game.system.setScene('Main');

		},

		keydown : function(key) {
			if (key === 'SPACE') {
				//this.player.jump();
				//alert('space key');
				// Restart game
				game.system.setScene('Main');
			}
		} ,
		spawnTires : function() {
			//var tires = new game.Tires(game.system.width, 850);
			var tires = new game.Tires(game.system.width,  10 + Math.random() * 1000);
			//var coin = new game.Coin(game.system.width, 10 + Math.random() * 1000);
		},
		spawnStars : function() {
			var stars = new game.Stars(game.system.width,  10 + Math.random() * 1000);
		}
	});

});
