//
import Phaser from 'phaser';

import TitleScreen from './scenes/TitleScreen';

import HelloWorldScene from './scenes/HelloWorldScene';

import GameOverScene from './scenes/game-over.js';

import Highscore from './scenes/Highscore';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: false,
      debug: false,
    },
  },
  scene: [TitleScreen, HelloWorldScene, GameOverScene, Highscore],
  render: {
    pixelArt: true,
  },
};

const game = new Phaser.Game(config);

//game.scene.add('titlescreen', TitleScreen);
game.scene.start('title-screen');
//game.scene.add('over', GameOverScene);
