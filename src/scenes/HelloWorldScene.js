import Phaser from 'phaser';

import Bullet from '../Bullet';
//import TitleScreen from './TitleScreen';

const Keys = ['Julia', 'Alex', 'Redbull'];
let player, playerControls, fireButton, game;
let enemy, enemy2, enemy3, spaceSound, bg;
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
    this.load.spritesheet('invader1', './assets/python.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('invader2', './assets/python.png', {
      frameWidth: 44,
      frameHeight: 32,
    });
    this.load.spritesheet('invader3', './assets/python.png', {
      frameWidth: 48,
      frameHeight: 32,
    });

    this.load.image('bg', './assets/big-bg.png');
    this.load.image(
      `${Keys[this.characterIndex]}`,
      `./assets/${Keys[this.characterIndex]}128.png`
    );

    this.load.image('bullet', './assets/laser-red-2.png');
  }

  create() {
    // background image is being created here
    this.add.image(400, 300, 'bg');

    player = this.physics.add.sprite(100, 100, Keys[this.characterIndex]);
    player.setCollideWorldBounds(true);
    player.x = 400;
    player.y = 500;
    console.log('init is ', this.data);

    this.physics.add.existing(player);
    playerControls = this.input.keyboard.createCursorKeys();

    this.bullets = this.physics.add.group({
      //the maximum number of bullets. 50 is fairly small and there will be pauses while firing waiting for fired bullets to recycle back into the available pool.
      maxSize: -1,
      classType: Bullet,
      //Since the bullet needs to update its position runChildUpdate must be true.
      runChildUpdate: true,
    });

    this.physics.world.on('worldbounds', this.onWorldbounds, this);

    fireButton = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //  spaceSound = this.sound.add('space', { volume: 0.2 });

    // enemy 1 is being created below
    this.physics.world.setBoundsCollision();
    enemy = this.physics.add.group();

    for (var i = 0; i < 13; i++) {
      var pineapple = enemy.create(200 + i * 48, 50, 'invader1');
      //This allows your sprite to collide with the world bounds like they were rigid objects
      pineapple.body.collideWorldBounds = true;
      pineapple.body.bounce.setTo(1, 1);
      pineapple.body.onWorldBounds = true;
      pineapple.setImmovable(true);

      console.log(pineapple);
    }

    this.physics.world.on(
      'worldbounds',
      function (body, top, bottom, left, right) {
        console.log('left', left, 'right', right, 'top', top, 'bottom', bottom);
        if (left) {
          enemy.setVelocityX(100);
        } else {
          enemy.setVelocityX(-100);
        }
      },
      this
    );
    enemy.setVelocityX(100);
    enemy.setOrigin(0.5, 0.5);

    //  enemy2 is been created here

    this.physics.world.setBoundsCollision();
    enemy2 = this.physics.add.group();

    for (let i = 0; i < 13; i++) {
      var invader = enemy2.create(200 + i * 48, 120, 'invader2');
      //This allows your sprite to collide with the world bounds like they were rigid objects
      invader.body.collideWorldBounds = true;
      invader.body.bounce.setTo(1, 1);
      invader.body.onWorldBounds = true;
      invader.setImmovable(true);

      console.log(invader);
    }

    this.physics.world.on(
      'worldbounds',
      function (body, top, bottom, left, right) {
        console.log('left', left, 'right', right, 'top', top, 'bottom', bottom);
        if (left) {
          enemy2.setVelocityX(100);
        } else {
          enemy2.setVelocityX(-100);
        }
      },
      this
    );
    enemy2.setVelocityX(100);
    enemy2.setOrigin(0.5, 0.5);

    // enemy3 is being created here

    this.physics.world.setBoundsCollision();
    enemy3 = this.physics.add.group();

    for (let i = 0; i < 13; i++) {
      invader = enemy2.create(200 + i * 48, 190, 'invader3');
      //This allows your sprite to collide with the world bounds like they were rigid objects
      invader.body.collideWorldBounds = true;
      invader.body.bounce.setTo(1, 1);
      invader.body.onWorldBounds = true;
      invader.setImmovable(true);

      console.log(invader);
    }

    this.physics.world.on(
      'worldbounds',
      function (body, top, bottom, left, right) {
        console.log('left', left, 'right', right, 'top', top, 'bottom', bottom);
        if (left) {
          enemy3.setVelocityX(100);
        } else {
          enemy3.setVelocityX(-100);
        }
      },
      this
    );
    enemy3.setVelocityX(100);
    enemy3.setOrigin(0.5, 0.5);

    Phaser.Actions.IncX(enemy.getChildren(), 100);
    Phaser.Actions.IncX(enemy2.getChildren(), 100);
    Phaser.Actions.IncX(enemy3.getChildren(), 100);

    this.physics.add.collider(
      this.bullets,
      enemy,
      function (bulletCollide, enemyCollide) {
        enemyCollide.destroy();
        bulletCollide.destroy();
      }.bind(this)
    );
    this.physics.add.collider(
      this.bullets,
      enemy2,
      function (bulletCollide, enemyCollide) {
        enemyCollide.destroy();
        bulletCollide.destroy();
      }.bind(this)
    );
    // this.physics.add.collider(
    //   this.bullets,
    //   enemy3,
    //   function (bulletCollide, enemy3Collide) {
    //     enemy3Collide.destroy();
    //     bulletCollide.destroy();
    //   }.bind(this)
    // );
  }

  update() {
    if (enemy.x > this.physics.world.bounds.width) {
      enemy.setVelocityX(-100);
    }

    if (enemy2.x > this.physics.world.bounds.width) {
      enemy2.setVelocityX(100);
    }

    if (enemy3.x > this.physics.world.bounds.width) {
      enemy3.setVelocityX(100);
    }
    this.movePlayer();

    if (fireButton.isDown) {
      this.fireBullet();
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
      bullet.shoot(player.x, player.y - 150);
    }
  }
  onWorldbounds(body) {
    const isBullet = this.bullets.contains(body.gameObject);
    if (isBullet) {
      body.gameObject.deactivate();
    }
  }
}

// checks for object collision,input from user.
