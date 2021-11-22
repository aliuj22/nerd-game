import Phaser from "phaser";

import TitleScreen from "./scenes/TitleScreen";

import HelloWorldScene from "./scenes/HelloWorldScene";

import GameOverScene from "./scenes/game-over";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [TitleScreen, HelloWorldScene],
  render: {
    pixelArt: true,
  },
};

//export default new Phaser.Game(config);

const game = new Phaser.Game(config);

//game.scene.add('titlescreen', TitleScreen);
game.scene.start("titlescreen");
game.scene.add("over", GameOverScene);
