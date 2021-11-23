const game = {};
import Phaser from 'phaser';

import TitleScreen from './scenes/TitleScreen';

import HelloWorldScene from './scenes/HelloWorldScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
   physics: {
    default: 'arcade',
  //   arcade: {
  //     gravity: false,
  //     // debug: true,
  //  },
  },
  scene: [HelloWorldScene, TitleScreen]
};

new Phaser.Game(config);







