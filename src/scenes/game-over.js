import Phaser from 'phaser';

import WebFontFile from './WebFontFile';

import { score, scoreStringOnScreen } from './HelloWorldScene';

import { storeInFirebase } from '../firebase';

var sky, username;
let highScore;
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
      .text(400, 80, 'GAME OVER!', {
        fontSize: '50px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 500, 'PRESS ENTER', {
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

    this.input.keyboard.once('keydown-ENTER', async () => {
      storeInFirebase(username, score);
      console.log('enter down');
      // start title screen scene
      this.scene.start('Highscore');
    });

    this.add
      .text(400, 300, 'ENTER YOUR NAME:', {
        fontSize: '30px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    var textEntry = this.add
      .text(400, 350, '', {
        fontSize: '30px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.input.keyboard.on('keydown', function (event) {
      if (event.keyCode === 8 && textEntry.text.length > 0) {
        textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
      } else if (
        event.keyCode === 32 ||
        (event.keyCode >= 48 && event.keyCode < 90)
      ) {
        textEntry.text += event.key;
      }
      console.log(textEntry.text);
      username = textEntry.text;
    });
  }

  update() {
    sky.tilePositionY += 0.5;
  }
}
