import Phaser from "phaser";

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.image("bg", "./assets/big-bg.png");
    this.load.spritesheet("invader1", "./assets/c.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.add.image(400, 300, "bg");
    var invader1 = this.add.group({
      key: "invader1",
      frame: 0,
      repeat: 8,
      setXY: { x: 80, y: 100, stepX: 60 },
    });
  }
}
