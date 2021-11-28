import Phaser from 'phaser';

import Bullet from '../Bullet';
//import TitleScreen from './TitleScreen';

const Keys = ['Julia', 'Alex', 'Redbull'];
let player, playerControls, fireButton, game;
//let enemy, enemy2, enemy3, spaceSound, bg;
let aliens;
var explosion, sky, scoreText;
var score = 0;
var scoreString = '';

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super('hello-world');
  }

  init(data) {
    //setting values of received data
    this.characterIndex = data.characterIndex;
    if (data.characterIndex == null) {
      this.characterIndex = 1;
    }
  }

  preload() {
    this.load.audio('space', './assets/space.mp3');
    this.load.spritesheet('invader', './assets/python.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image('bg', './assets/big-bg.png');
    this.load.image(
      `${Keys[this.characterIndex]}`,
      `./assets/${Keys[this.characterIndex]}128.png`
    );

    this.load.image('bullet', './assets/laser-red-2.png');
    this.load.spritesheet('explosion', './assets/explosion-2.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    console.log(Keys[this.characterIndex]);
    sky = this.add.tileSprite(500, 100, 1024, 1024, 'bg');

    player = this.physics.add.sprite(100, 100, Keys[this.characterIndex]);
    player.setCollideWorldBounds(true);
    player.x = 400;
    player.y = 500;
    console.log('init is ', this.data);

    this.physics.add.existing(player);
    playerControls = this.input.keyboard.createCursorKeys();

    this.bullets = this.physics.add.group({
      //the maximum number of bullets. 50 is fairly small and there will be pauses while firing waiting for fired bullets to recycle back into the available pool.
      maxSize: 1,
      classType: Bullet,
      //Since the bullet needs to update its position runChildUpdate must be true.
      runChildUpdate: true,
    });

    this.physics.world.on('worldbounds', this.onWorldbounds, this);

    fireButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    aliens = this.physics.add.group();
    // aliens.enableBody = true;
    // aliens.physicsBodyType = Phaser.Physics.Arcade;

    this.createAliens();

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
          'explosion'
        );

        //this will be added to if statement when enemy is hit
        //explosion.play('explosion', false);
        explosion.play({ key: 'explosion', hideOnComplete: true }, false);
        explosion.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          //   console.log(Phaser.Animations.Events.ANIMATION_COMPLETE);
          explosion.destroy();
        });
      }.bind(this)
    );

    // game.physics.arcade.overlap(
    //   this.bullets,
    //   aliens,
    //   this.collisionHandler,
    //   null,
    //   this
    // );

    //------SCORE TEXT AND IT'S CALCULATION-------//
    scoreString = 'Score: ';
    scoreText = this.add.text(10, 10, scoreString + score, {
      fontSize: '16px',
      fontFamily: '"Press Start 2P"',
    });
  }

  // hitBox(player, explosion) {
  //   explosion.play('explosion', false);
  //   explosion.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
  //     console.log(Phaser.Animations.Events.ANIMATION_COMPLETE);
  //     explosion.destroy();
  //   });
  // }

  // collisionHandler(bullet, enemy) {
  //   bullet.destroy();
  //   enemy.destroy();
  // }

  createAliens() {
    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 10; x++) {
        var alien = aliens.create(x * 48, y * 50, 'invader');
        alien.setOrigin(-3, -3);
      }
    }

    aliens.x = 100;
    aliens.y = 50;
  }

  update() {
    //animation for explosions
    this.anims.create({
      key: 'explosion',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 8,
      }),
      repeat: 0,
    });

    sky.tilePositionY += 0.8;

    //moving the player
    this.movePlayer();

    //firing bullets on space down
    if (fireButton.isDown) {
      this.fireBullet();
    }

    //checks if all enemies from a wave are dead
    this.checkIfAllEnemiesDead();
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
  onWorldbounds(body) {
    const isBullet = this.bullets.contains(body.gameObject);
    if (isBullet) {
      //body.gameObject.deactivate();
      body.gameObject.destroy();
    }
  }

  checkIfAllEnemiesDead() {
    if (aliens.countActive(true) === 0) {
      this.createAliens();
      this.tweens.add({
        targets: aliens,
        duration: 2000,
      });
      Phaser.Actions.Call(
        aliens.getChildren(),
        (function movingAliens(context) {
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
    }
  }
}
