import Phaser from "phaser";

import TitleScreen from "./scenes/TitleScreen";

import HelloWorldScene from "./scenes/HelloWorldScene";

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
  scene: [TitleScreen],
};

//export default new Phaser.Game(config);

const game = new Phaser.Game(config);

game.scene.add("titlescreen", HelloWorldScene);
