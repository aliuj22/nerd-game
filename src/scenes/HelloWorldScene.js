import Phaser from 'phaser';

import Bullet from '../Bullet';
import Bomb from '../bomb';

const Keys = ['Julia', 'Alex', 'Redbull'];
let player, playerControls, fireButton, bulletSound, aliens, timer;
var explosion,
  sky,
  addScoreTextToTheScreen,
  addLifeTextToTheScreen,
  width,
  spaceSound,
  bombSound;
var score = 0;
var scoreStringOnScreen = '';
var livesLeft = 3;
var lifeStringOnScreen = '';
var bombInterval;

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
    this.load.audio('bulletSound', './assets/bulletSound.wav');
    this.load.audio('bombSound', './assets/explosion.wav');

    this.load.spritesheet('invader0', './assets/html.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('invader1', './assets/css.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('invader2', './assets/javascript.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('invader3', './assets/java.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('invader4', './assets/python.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('invader5', './assets/php.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('invader6', './assets/kotlin.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('invader7', './assets/typescript.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('invader8', './assets/ruby.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('invader9', './assets/swift.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('invader10', './assets/csharp.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('bomb', './assets/404-error.png');

    this.load.image('bg', './assets/test.png');
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
    //------RESET SCORE AND LIVES COUNT AT GAME START-----//
    if (score > 0 || livesLeft < 3) {
      score = 0;
      livesLeft = 3;
    }
    //---GAME WIDTH---//
    width = this.physics.world.bounds.width;

    //----CREATING BACKGORUND----//
    sky = this.add.tileSprite(500, 100, 1024, 1024, 'bg');

    //----ADDING PLAYERS CHOSEN CHARACTER----//
    player = this.physics.add.sprite(100, 100, Keys[this.characterIndex]);
    player.setCollideWorldBounds(true);
    player.x = 400;
    player.y = 500;
    player.setBodySize(80, 80);
    player.setPushable(false);

    this.physics.add.existing(player);
    playerControls = this.input.keyboard.createCursorKeys();

    //---ADDING PLAYERS BULLET--- //
    this.bullets = this.physics.add.group({
      //the maximum number of bullets. 50 is fairly small and there will be pauses while firing waiting for fired bullets to recycle back into the available pool.
      maxSize: 2,
      classType: Bullet,
      //Since the bullet needs to update its position runChildUpdate must be true.
      runChildUpdate: true,
    });

    this.physics.world.on('worldbounds', this.onWorldbounds, this);

    //---SPECIFYING BUTTON FOR FIRING---//
    fireButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //-------CREATING BOMB GROUP------//
    this.bomb = this.physics.add.group({
      maxSize: 1,
      classType: Bomb,
      //Since the bomb needs to update its position runChildUpdate must be true.
      runChildUpdate: true,
    });
    //----TIMER THAT INCREASES BOMB MAX SIZE AFTER SPECIFIED TIME----/
    timer = this.time.addEvent({
      delay: 15000, // ms
      callback: increaseMaxSize,
      //args: [],
      callbackScope: this,
      loop: true,
      paused: false,
    });
    //-----FUNCTION INCREASING BOMB MAX SIZE-----/
    function increaseMaxSize() {
      this.bomb.maxSize += 1;
      console.log(this.bomb.maxSize);
      if (this.bomb.maxSize === 5) {
        this.bomb.maxSize -= 3;
      }
    }

    this.physics.world.on('worldbounds', this.onWorldbounds, this);

    //---CREATING BACKGROUND SOUND----//
    spaceSound = this.sound.add('space', { volume: 0.2 });
    spaceSound.play();

    //----CREATING BULLET SOUND----//
    bulletSound = this.sound.add('bulletSound', { volume: 0.2 });

    //----CREATING BOMB HITTING PLAYER SOUND----//
    bombSound = this.sound.add('bombSound', { volume: 0.2 });

    //-----CREATING ALIENS GROUP----//
    aliens = this.physics.add.group();
    this.createAliens();

    //THIS CREATES MOVEMENT OF THE ALIENS

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

    //------------DESTROYING ENEMIES----------//
    this.physics.add.collider(
      this.bullets,
      aliens,
      function (bulletCollide, enemyCollide) {
        score += 10;
        addScoreTextToTheScreen.text = scoreStringOnScreen + score;

        enemyCollide.destroy();
        bulletCollide.destroy();
        explosion = this.add.sprite(
          bulletCollide.x,
          bulletCollide.y,
          'explosion'
        );
        bombSound.play();

        explosion.play({ key: 'explosion', hideOnComplete: true }, false);
        explosion.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          explosion.destroy();
        });
      }.bind(this)
    );

    //---PLAYER/BOMB COLLISION HANDLER---//
    this.physics.add.collider(
      this.bomb,
      player,
      function (playerCollide, bombCollide) {
        livesLeft -= 1;
        addLifeTextToTheScreen.text = lifeStringOnScreen + livesLeft;

        bombSound.play();
        bombCollide.destroy();
        if (livesLeft === 0) {
          this.scene.start('game-over', [score, scoreStringOnScreen]);
        }
      }.bind(this)
    );

    //------BULLET/ BOMB COLLISION HADLER------//
    this.physics.add.collider(
      this.bomb,
      this.bullets,
      function (bombCollide, bulletCollide) {
        bombCollide.destroy();
        bulletCollide.destroy();
      }.bind(this)
    );

    //------SCORE TEXT - SHOW ON SCREEN-------//
    scoreStringOnScreen = 'Score: ';
    addScoreTextToTheScreen = this.add.text(
      10,
      10,
      scoreStringOnScreen + score,
      {
        fontSize: '16px',
        fontFamily: '"Press Start 2P"',
      }
    );

    //--------SHOWING AMOUNT OF LIFE ON THE SCREEN------//
    lifeStringOnScreen = 'Lives Left: ';
    addLifeTextToTheScreen = this.add.text(
      width - 10,
      10,
      lifeStringOnScreen + livesLeft,
      {
        fontSize: '16px',
        fontFamily: '"Press Start 2P"',
      }
    );
    addLifeTextToTheScreen.setOrigin(1, 0);
  }

  //---CREATING ALIENS---//
  createAliens() {
    for (var y = 0; y < 4; y++) {
      for (var x = 0; x < 10; x++) {
        var alien = aliens.create(
          x * 48,
          y * 50,
          `invader${Math.floor(Math.random() * 10)}`
        );
        alien.setOrigin(-3, -2.5);
      }
    }

    aliens.x = 100;
    aliens.y = 50;
  }

  update() {
    //ANIMATION FOR EXPLOSIONS
    this.anims.create({
      key: 'explosion',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 7,
      }),
      repeat: 0,
    });

    if (bombInterval < 100) {
      bombInterval++;
      console.log(bombInterval);
    } else {
      bombInterval <= 4;
      this.throwBomb();
    }

    //MOVING BACKGROUND
    sky.tilePositionY += 0.8;

    //MOVING THE PLAYER
    this.movePlayer();

    //FIRING BULLETS ON SPACE DOWN
    if (fireButton.isDown) {
      this.fireBullet();
      // this.throwBomb();
    }

    //CHECKS IF ALL ENEMIES FROM A WAVE ARE DEAD
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
      bullet.shoot(player.x, player.y - 80);
      bulletSound.play();
    }
  }

  throwBomb() {
    // console.log(aliens.getChildren());
    let random = Math.floor(Math.random() * aliens.getChildren().length);
    const bomb = this.bomb.get();
    if (bomb) {
      bomb.throw(
        aliens.getChildren()[random].body.center.x,
        aliens.getChildren()[random].body.center.y
      );
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
    if (isBomb) {
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
      this.bomb.maxSize = 2;
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

export { score, scoreStringOnScreen };
