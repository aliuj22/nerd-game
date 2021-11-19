import Phaser from 'phaser';

import WebFontFile from './WebFontFile';

import { Game } from '../scenes/HelloWorldScene';

export default class TitleScreen extends Phaser.Scene {
  preload() {
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts);
  }
  create() {
    const title = this.add.text(400, 250, 'Nerd Invader', {
      fontSize: 38,
      fontFamily: '"Press Start 2P"',
    });
    title.setOrigin(0.5, 0.5);

    this.add
      .text(400, 300, 'Press Space to Start', {
        fontSize: 20,
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      console.log('space down');
      this.scene.start('game', Game);
    });
  }
}
