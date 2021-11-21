import Phaser from "phaser";

import WebFontFile from "./WebFontFile";

import HelloWorldScene from "../scenes/HelloWorldScene";
import TitleScreen from "./TitleScreen";

// import HelloWorldScene from "./HelloWorldScene";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);
    this.load.image("bg", "./assets/big-bg.png");
  }
  create() {
    this.add.image(400, 300, "bg");

    this.add
      .text(400, 80, "Game Over!", {
        fontSize: "50px",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 130, "Press Enter To Try Again", {
        fontSize: "20px",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 230, "Your Score:", {
        fontSize: "30px",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-ENTER", () => {
      console.log("enter down");
      this.scene.start("title-screen");
    });
  }
}
