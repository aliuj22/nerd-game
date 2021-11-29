import Phaser from "phaser";

import Bullet from "../Bullet";
import Bomb from "../bomb";
//import TitleScreen from './TitleScreen';

const Keys = ["Julia", "Alex", "Redbull"];
let player, playerControls, fireButton, game;
//let enemy, enemy2, enemy3, spaceSound, bg;
let aliens;
var explosion, sky, scoreText;
var score = 0;
var scoreString = "";
var bomb;
var bombInterval;

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  init(data) {
    //setting values of received data
    this.characterIndex = data.characterIndex;
    if (data.characterIndex == null) {
      this.characterIndex = 1;
    }
  }

  preload() {
    this.load.audio("space", "./assets/space.mp3");
    this.load.spritesheet("invader", "./assets/python.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("bomb", "./assets/laser-blue-3.png");
    // this.load.spritesheet("invader2", "./assets/python.png", {
    //   frameWidth: 44,
    //   frameHeight: 32,
    // });
    // this.load.spritesheet("invader3", "./assets/python.png", {
    //   frameWidth: 48,
    //   frameHeight: 32,
    // });

    this.load.image("bg", "./assets/big-bg.png");
    this.load.image(
      `${Keys[this.characterIndex]}`,
      `./assets/${Keys[this.characterIndex]}128.png`
    );

    this.load.image("bullet", "./assets/laser-red-2.png");
    this.load.spritesheet("explosion", "./assets/explosion-2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    console.log(Keys[this.characterIndex]);
    sky = this.add.tileSprite(500, 100, 1024, 1024, "bg");

    player = this.physics.add.sprite(100, 100, Keys[this.characterIndex]);
    player.setCollideWorldBounds(true);
    player.x = 400;
    player.y = 500;
    console.log("init is ", this.data);

    this.physics.add.existing(player);
    playerControls = this.input.keyboard.createCursorKeys();

    this.bullets = this.physics.add.group({
      //the maximum number of bullets. 50 is fairly small and there will be pauses while firing waiting for fired bullets to recycle back into the available pool.
      maxSize: 1,
      classType: Bullet,
      //Since the bullet needs to update its position runChildUpdate must be true.
      runChildUpdate: true,
    });

    this.physics.world.on("worldbounds", this.onWorldbounds, this);

    fireButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.bomb = this.physics.add.group( {
      //the maximum number of bomb. 50 is fairly small and there will be pauses while firing waiting for fired bullets to recycle back into the available pool.
      maxSize: 1,
      classType: Bomb,
      //Since the bomb needs to update its position runChildUpdate must be true.
      runChildUpdate: true,
      
    });

    this.physics.world.on("worldbounds", this.onWorldbounds, this);

    


    // //  spaceSound = this.sound.add('space', { volume: 0.2 });

    // // enemy 1 is being created below
    // this.physics.world.setBoundsCollision();
    // enemy = this.physics.add.group();

    // for (var i = 0; i < 13; i++) {
    //   var pineapple = aliens.create(200 + i * 48, 50, "invader1");
    //   //This allows your sprite to collide with the world bounds like they were rigid objects
    //   pineapple.body.collideWorldBounds = true;
    //   pineapple.body.bounce.setTo(1, 1);
    //   pineapple.body.onWorldBounds = true;
    //   pineapple.setImmovable(true);

    //   console.log(pineapple);
    // }

    // this.physics.world.on(
    //   "worldbounds",
    //   function (body, top, bottom, left, right) {
    //     console.log("left", left, "right", right, "top", top, "bottom", bottom);
    //     if (left) {
    //       enemy.setVelocityX(100);
    //     } else {
    //       enemy.setVelocityX(-100);
    //     }
    //   },
    //   this
    // );
    // enemy.setVelocityX(100);
    // enemy.setOrigin(0.5, 0.5);

    // //  enemy2 is been created here

    // this.physics.world.setBoundsCollision();
    // enemy2 = this.physics.add.group();

    // for (let i = 0; i < 13; i++) {
    //   var invader = enemy2.create(200 + i * 48, 120, "invader2");
    //   //This allows your sprite to collide with the world bounds like they were rigid objects
    //   invader.body.collideWorldBounds = true;
    //   invader.body.bounce.setTo(1, 1);
    //   invader.body.onWorldBounds = true;
    //   invader.setImmovable(true);

    //   console.log(invader);
    // }

    // this.physics.world.on(
    //   "worldbounds",
    //   function (body, top, bottom, left, right) {
    //     console.log("left", left, "right", right, "top", top, "bottom", bottom);
    //     if (left) {
    //       enemy2.setVelocityX(100);
    //     } else {
    //       enemy2.setVelocityX(-100);
    //     }
    //   },
    //   this
    // );
    // enemy2.setVelocityX(100);
    // enemy2.setOrigin(0.5, 0.5);

    // // enemy3 is being created here

    // this.physics.world.setBoundsCollision();
    // enemy3 = this.physics.add.group();

    // for (let i = 0; i < 13; i++) {
    //   invader = enemy2.create(200 + i * 48, 190, "invader3");
    //   //This allows your sprite to collide with the world bounds like they were rigid objects
    //   invader.body.collideWorldBounds = true;
    //   invader.body.bounce.setTo(1, 1);
    //   invader.body.onWorldBounds = true;
    //   invader.setImmovable(true);

    //   console.log(invader);
    // }

    // this.physics.world.on(
    //   "worldbounds",
    //   function (body, top, bottom, left, right) {
    //     console.log("left", left, "right", right, "top", top, "bottom", bottom);
    //     if (left) {
    //       enemy3.setVelocityX(100);
    //     } else {
    //       enemy3.setVelocityX(-100);
    //     }
    //   },
    //   this
    // );
    // enemy3.setVelocityX(100);
    // enemy3.setOrigin(0.5, 0.5);

    // Phaser.Actions.IncX(enemy.getChildren(), 100);
    // Phaser.Actions.IncX(enemy2.getChildren(), 100);
    // Phaser.Actions.IncX(enemy3.getChildren(), 100);

    aliens = this.physics.add.group();
    // aliens.enableBody = true;
    // aliens.physicsBodyType = Phaser.Physics.Arcade;

    this.createAliens();

    

    // var destX = 700;
    // let tween = this.tweens.add({
    //   targets: aliens,
    //   duration: 500,
    //   yoyo: true,
    //   repeat: 8,
    //   ease: "Sine.easeInOut",

    //   x: {
    //     getEnd: function (target, key, value) {
    //       destX -= 30;

    //       return destX;
    //     },

    //     getStart: function (target, key, value) {
    //       return value + 30;
    //     },
    //   },
    // });
    // graphics = this.add.graphics();
    // follower = { t: 0, vec: new Phaser.Math.Vector2() };
    // var line = new Phaser.Curves.Line([100, 100, 600, 100]);

    // //path = this.add.path();
    // path = new Phaser.Curves.Path();
    // path.add(line);

    // this.tweens.add({
    //   targets: followe,

    //   t: 1,
    //   ease: "Linear",
    //   duration: 4000,
    //   yoyo: true,
    //   repeat: -1,
    // });

    this.tweens.add({
      targets: aliens,
      duration: 2000,
    });
    Phaser.Actions.Call(
      aliens.getChildren(),
      (function (context) {
        return function (go) {
          context.tweens.add({
            targets: go,
            y: go.y + 0,
            x: go.x + 200,
            duration: 2000,
            repeat: -1,
            yoyo: true,
          });
        };
      })(this)
    );

    //------------DESTROYING ENEMIES----------
    this.physics.add.collider(
      this.bullets,
      aliens,
      function (bulletCollide, enemyCollide) {
        score += 10;
        scoreText.text = scoreString + score;
        enemyCollide.destroy();
        bulletCollide.destroy();
        explosion = this.add.sprite(
          bulletCollide.x,
          bulletCollide.y,
          "explosion"
        );

        //this will be added to if statement when enemy is hit
        explosion.play({key: "explosion", hideOnComplete: true}, false);
        explosion.on (Phaser.Animations.Events.ANIMATION_COMPLETE, () =>{
          explosion.destroy();
        });
      }.bind(this)
    );

    this.physics.add.collider(
      this.bomb,
      player,
      function (bombCollide, playerCollide) {        
        playerCollide.destroy();
        bombCollide.destroy();
        bombCollide.destroy();
        explosion = this.add.sprite(
          // bombCollide.x,
          // bombCollide.y,
          // playerCollide.x,
          // bombCollide.y,
          // "explosion"
        );
      }.bind(this)
      );


    //------SCORE TEXT AND IT'S CALCULATION-------//
    scoreString = "Score: ";
    scoreText = this.add.text(10, 10, scoreString + score, {
      fontSize: "16px",
      fontFamily: '"Press Start 2P"',
    });
  }

  createAliens() {
    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 10; x++) {
        var alien = aliens.create(x * 48, y * 50, "invader");
        //alien.anchor.setTo(0.5, 0.5);
        //alien.animations.add("fly", [0, 1, 2, 3], 20, true);
        //alien.play("fly");
        // alien.body.moves = false;
        alien.setOrigin(-3, -3);
      }
    }

    aliens.x = 100;
    aliens.y = 50;
  }

  update() {
    //animation for explosions
    this.anims.create({
      key: "explosion",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 8,
      }),
      repeat: 0,
    });
    if(bombInterval < 100){
      bombInterval++
    }else{
      bombInterval = 0
      this.throwBomb()
    }
    sky.tilePositionY += 0.8;
    // if (enemy.x > this.physics.world.bounds.width) {
    //   enemy.setVelocityX(-100);
    // }

    // if (enemy2.x > this.physics.world.bounds.width) {
    //   enemy2.setVelocityX(100);
    // }

    // if (enemy3.x > this.physics.world.bounds.width) {
    //   enemy3.setVelocityX(100);
    // }

    //moving the player
    this.movePlayer();

    //fireing bullets on space down
    if (fireButton.isDown) {
      this.fireBullet();
      // this.throwBomb();
      
    }
  }

  movePlayer() {
    if (playerControls.left.isDown) {
      player.x -= 10;
    } else if (playerControls.right.isDown) {
      player.x += 10;
    }
  }

  fireBullet() {
    const bullet = this.bullets.get();
    if (bullet) {
      bullet.shoot(player.x, player.y - 100);
    }
  }

  throwBomb (){
    console.log(aliens.getChildren())
    let random = Math.floor(Math.random() * aliens.getChildren().length)
    const bomb = this.bomb.get();
    if(bomb) {
      bomb.throw(aliens.getChildren()[random].body.center.x, aliens.getChildren()[random].body.center.y)
      // bomb.setVelocityY(Phaser.Math.Between(-200, 200), 30);
      
      
    }
  }
  onWorldbounds(body) {
    const isBullet = this.bullets.contains(body.gameObject);
    if (isBullet) {
      //body.gameObject.deactivate();
      body.gameObject.destroy();
    }

    const isBomb = this.bomb.contains(body.gameObject);
    if(isBomb) {
      body.gameObject.destroy();
    }
  }
}
