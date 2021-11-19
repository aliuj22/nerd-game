import Phaser from 'phaser';

import WebFontFile from './WebFontFile';

import HelloWorldScene from '../scenes/HelloWorldScene';

export default class TitleScreen extends Phaser.Scene {
  preload() {
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts);

    const Alex = this.load.image('Alex', './assets/Alex128.png');
    const Julia = this.load.image('Julia', './assets/Julia128.png');
    const Redbull = this.load.image('Redbull', './assets/redbull128.png');
  }
  create() {
    const title = this.add.text(400, 100, 'Nerd Invaders', {
      fontSize: '38px',
      fontFamily: '"Press Start 2P"',
    });
    title.setOrigin(0.5, 0.5);

    const Alex = this.add.image(100, 100, 'Alex');
    const Julia = this.add.image(100, 100, 'Julia');
    const Redbull = this.add.image(100, 100, 'Redbull');

    Alex.x = 400;
    Alex.y = 300;

    Julia.x = 250;
    Julia.y = 300;

    Redbull.x = 550;
    Redbull.y = 300;

    this.add
      .text(400, 500, 'Press Space to Start', {
        fontSize: '20px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      console.log('space down');
      this.scene.start('game', HelloWorldScene);
    });
  }
}
