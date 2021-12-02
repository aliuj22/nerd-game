import Phaser from 'phaser';

import WebFontFile from './WebFontFile';

import { score, scoreStringOnScreen } from './HelloWorldScene';

var sky;

// import HelloWorldScene from "./HelloWorldScene";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  preload() {
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts);
    this.load.image('bgr', './assets/bg2.png');
  }
  create() {
    sky = this.add.tileSprite(500, 100, 1024, 1024, 'bgr');

    this.add
      .text(400, 80, 'Game Over!', {
        fontSize: '50px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 130, 'Press Enter To Try Again', {
        fontSize: '20px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 230, scoreStringOnScreen + score, {
        fontSize: '30px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.input.keyboard.once('keydown-ENTER', () => {
      console.log('enter down');
      // start title screen scene
      this.scene.start('title-screen');
    });
  }

  update() {
    sky.tilePositionY += 0.5;
  }
}
