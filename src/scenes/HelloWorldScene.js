import Phaser from "phaser";

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.image("bg", "./assets/big-bg.png");
    this.load.image("html", "./assets/html.png");
  }

  create() {
    this.add.image(400, 300, "bg");
    this.add.image(400, 300, "html");
  }
}
