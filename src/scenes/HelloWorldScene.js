import Phaser from 'phaser';

import Bullet from '../Bullet';
//import TitleScreen from './TitleScreen';

const Keys = ['Julia', 'Alex', 'Redbull'];
let player, playerControls, fireButton, game;
let bulletTime = 0;

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
    this.load.image('bg', './assets/big-bg.png');
    this.load.image(
      `${Keys[this.characterIndex]}`,
      `./assets/${Keys[this.characterIndex]}128.png`
    );
    this.load.spritesheet('invader1', './assets/c.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image('bullet', './assets/bullet.png');
  }

  create() {
    console.log(Keys[this.characterIndex]);
    this.add.image(400, 300, 'bg');

    player = this.physics.add.sprite(100, 100, Keys[this.characterIndex]);
    player.setCollideWorldBounds(true);
    player.x = 400;
    player.y = 500;
    console.log('init is ', this.data);
    this.load.image('bg', './assets/big-bg.png');

    // this.load.spritesheet('invader1', './assets/c.png', {
    //   frameWidth: 64,
    //   frameHeight: 64,
    // });
    // var invader1 = this.add.group({
    //   key: 'invader1',
    //   frame: 0,
    //   repeat: 8,
    //   setXY: { x: 80, y: 3100, stepX: 60 },
    // });

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
  }

  update() {
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
  //   fireBullet() {
  //     //  To avoid them being allowed to fire too fast we set a time limit
  //     if (this.time.now > bulletTime) {
  //       //  Grab the first bullet we can from the pool
  //       bullets = bullets.getFirstExists(false);

  //       if (bullets) {
  //         //  And fire it
  //         bullets.reset(player.x, player.y + 8);
  //         bullets.body.velocity.y = -400;
  //         bulletTime = this.time.now + 200;
  //       }
  //     }
  //   }
}
