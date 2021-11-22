import Phaser from 'phaser';

import TitleScreen from './TitleScreen';

const Keys = ['Julia', 'Alex', 'Redbull'];

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
  }

  create() {
    console.log(Keys[this.characterIndex]);
    this.add.image(400, 300, 'bg');

    const player = this.add.image(100, 100, Keys[this.characterIndex]);
    player.x = 400;
    player.y = 500;
    console.log('init is ', this.data);
  }
}
