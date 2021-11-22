import Phaser from 'phaser';

import TitleScreen from './TitleScreen';

const Keys = ['Julia', 'Alex', 'Redbull'];
let player, playerControls;
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
  }

  create() {
    console.log(Keys[this.characterIndex]);
    this.add.image(400, 300, 'bg');

    player = this.add.image(100, 100, Keys[this.characterIndex]);
    player.x = 400;
    player.y = 500;
    console.log('init is ', this.data);
    this.load.image('bg', './assets/big-bg.png');
    this.load.spritesheet('invader1', './assets/c.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    var invader1 = this.add.group({
      key: 'invader1',
      frame: 0,
      repeat: 8,
      setXY: { x: 80, y: 100, stepX: 60 },
    });

    this.physics.add.existing(player);
    playerControls = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.movePlayer();
  }

  movePlayer() {
    if (playerControls.left.isDown) {
      player.x -= 10;
    } else if (playerControls.right.isDown) {
      player.x += 10;
    }
  }
}
