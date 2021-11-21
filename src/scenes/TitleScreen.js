import Phaser from "phaser";

import WebFontFile from "./WebFontFile";

import HelloWorldScene from "../scenes/HelloWorldScene";

// import HelloWorldScene from "./HelloWorldScene";

export default class TitleScreen extends Phaser.Scene {
  constructor() {
    super("title-screen");
  }

  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);
    this.load.image("bg", "./assets/big-bg.png");
  }
  create() {
    this.add.image(400, 300, "bg");
    const title = this.add.text(400, 100, "Nerd Invaders", {
      fontSize: "38px",
      fontFamily: '"Press Start 2P"',
    });
    title.setOrigin(0.5, 0.5);

    this.add
      .text(400, 300, "Press Space to Start", {
        fontSize: "20px",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      console.log("space down");
      this.scene.start("hello-world");
    });
  }
}
