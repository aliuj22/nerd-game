const game = {};
import Phaser from "phaser";

import TitleScreen from "./scenes/TitleScreen";

import HelloWorldScene from "./scenes/HelloWorldScene";

import GameOverScene from "./scenes/game-over.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    //   arcade: {
    //     gravity: false,
    //     // debug: true,
    //  },
  },
  scene: [TitleScreen, HelloWorldScene, GameOverScene],
  render: {
    pixelArt: true,
  },
};

new Phaser.Game(config);

//game.scene.add('titlescreen', TitleScreen);
game.scene.start("title-screen");
//game.scene.add('over', GameOverScene);
