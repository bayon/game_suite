game.module(
    'game.objects'
)
.body(function() {
    
game.createClass('Player', {
    onGround: false,
    score : 0,
    life : 0,
    init: function(x, y) {
        this.sprite = game.Animation.fromFrames('run');
        this.sprite.animationSpeed = 0.2;
        this.sprite.anchor.set(0.5, 0.6);
        this.sprite.play();

        this.runTextures = this.sprite.textures;
        this.jumpUpTextures = [game.Texture.fromFrame('jump-up.png')];
        this.jumpDownTextures = [game.Texture.fromFrame('jump-down.png')];
        this.hitTextures = [game.Texture.fromFrame('hit-wall.png')];

        this.body = new game.Body({
            position: {
                x: x,
                y: y
            },
            mass: 1,
            collisionGroup: 0,
            // 1 = floor
            // 2 = pickup
            // 3 = obstacle
            // 4 = oneway
            collideAgainst: [1, 2, 3, 4],
            velocityLimit: {
                x: 0,
                y: 1200
            }
        });
        this.body.collide = this.collide.bind(this);

        this.sprite.position.set(x, this.body.position.y);

        var shape = new game.Rectangle(80, 190);
        this.body.addShape(shape);
        game.scene.world.addBody(this.body);
        game.scene.addObject(this);
    },

    addScore: function(score) {

        game.scene.addScore(1);
       // alert(game.scene.score);
         if(game.scene.score == 3){
            alert('good...');
        }
        if(game.scene.score == 5){
            alert('amazing...you frickin win!');
            game.scene.addTimer(500, function() {
                // Restart game
                game.system.setScene('Celebration');
            });
           
        }
         if(game.scene.score == 7){
            //alert('WT AMAZING...');

        }
    },

    subtractLife: function(score) {

        game.scene.subtractLife(1);
 
    },

    jump: function() {
        if (!this.onGround || this.killed) return;

        this.sprite.textures = this.jumpUpTextures;
        this.body.velocity.y = -this.body.velocityLimit.y;
        this.body.mass = 1;
        this.onGround = false;
    },

    collide: function(other) {
        console.log('collide with other.CollisionGroup'+other.collisionGroup);
        if (other.collisionGroup === 1) {
            this.body.velocity.y = 0;
            this.body.mass = 0;
            this.onGround = true;
             console.log('the ground');

        }
        else if (other.collisionGroup === 2) {
            other.parent.remove();
            console.log('coin');
            //this.score++;
            //alert(this.score);
            this.addScore(1);
            return false;
        }
        else if (other.collisionGroup === 3) {
             console.log('tires');
            this.kill();
             this.subtractLife(1);
            return false;
        }
        else if (other.collisionGroup === 4) {
             console.log('anywhere over the platform');
            if (this.body.last.y + this.body.shape.height / 2 <= other.position.y - other.shape.height / 2) {
                this.body.velocity.y = 0;
                this.onGround = true;
            }
            else return false;
        }
        return true;
    },

    kill: function() {

        if( game.scene.life <= 1){
            this.killed = true;
            this.body.mass = 1;
            game.scene.world.removeBodyCollision(this.body);
            this.body.velocity.y = -this.body.velocityLimit.y / 2;
            this.sprite.textures = this.hitTextures;
            game.scene.addTimer(500, function() {
                // Restart game
                game.system.setScene('Death');
            });
        }else{
            console.log("LOSE A Lifebar and add a Hurt() animation");
        }
       
    },

    update: function() {
        // Update sprite position
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;

        if (this.killed) return;

        if (this.body.velocity.y > 0) this.onGround = false;

        // Update sprite textures
        if (!this.onGround && this.body.velocity.y > 0 && this.sprite.textures !== this.jumpDownTextures) {
            this.sprite.textures = this.jumpDownTextures;
        }
        if (this.onGround && this.sprite.textures !== this.runTextures) {
            this.sprite.textures = this.runTextures;
        }
    }
});

game.createClass('Coin', {
    init: function(x, y) {
        this.sprite = game.Animation.fromFrames('coin-gold');
        this.sprite.animationSpeed = 0.2;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.play();

        this.body = new game.Body({
            position: {
                x: x + this.sprite.width,
                y: y
            },
            collisionGroup: 2
        });

        this.body.parent = this;
        this.body.velocity.x = -600;
        var shape = new game.Rectangle(40, 60);
        this.body.addShape(shape);
        game.scene.objectContainer.addChild(this.sprite);
        game.scene.world.addBody(this.body);
        game.scene.addObject(this);
    },

    remove: function() {
        game.scene.world.removeBody(this.body);
        game.scene.objectContainer.removeChild(this.sprite);
        game.scene.removeObject(this);
    },

    update: function() {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;

        if (this.body.position.x + this.sprite.width / 2 < 0) this.remove();
    }
});

game.createClass('Tires', {
    init: function(x, y) {
        this.sprite = new game.Sprite('tires.png');
        this.sprite.anchor.set(0.5, 0.5);

        this.body = new game.Body({
            position: {
                x: x + this.sprite.width,
                y: y
            },
            collisionGroup: 3
        });

        this.body.velocity.x = -600;
        var shape = new game.Rectangle(this.sprite.width, this.sprite.height);
        this.body.addShape(shape);
        game.scene.objectContainer.addChild(this.sprite);
        game.scene.world.addBody(this.body);
        game.scene.addObject(this);
    },

    remove: function() {
        game.scene.world.removeBody(this.body);
        game.scene.objectContainer.removeChild(this.sprite);
        game.scene.removeObject(this);
    },

    update: function() {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;

        if (this.body.position.x + this.sprite.width / 2 < 0) this.remove();
    }
});

game.createClass('Oneway', {
    init: function(x, y) {
        this.sprite = new game.Sprite('oneway.png');
        this.sprite.anchor.set(0.5, 0.5);

        this.body = new game.Body({
            position: {
                x: x + this.sprite.width,
                y: y
            },
            collisionGroup: 4
        });

        this.body.velocity.x = -600;
        var shape = new game.Rectangle(this.sprite.width, this.sprite.height);
        this.body.addShape(shape);
        game.scene.objectContainer.addChild(this.sprite);
        game.scene.world.addBody(this.body);
        game.scene.addObject(this);
    },

    remove: function() {
        game.scene.world.removeBody(this.body);
        game.scene.objectContainer.removeChild(this.sprite);
        game.scene.removeObject(this);
    },

    update: function() {
        this.sprite.position.x = this.body.position.x;
        this.sprite.position.y = this.body.position.y;

        if (this.body.position.x + this.sprite.width / 2 < 0) this.remove();
    }
});

});
