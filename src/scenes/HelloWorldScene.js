import Phaser from "phaser";

import TitleScreen from "./TitleScreen";

const Keys = ["Julia", "Alex", "Redbull"];
var explosion;

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  init(data) {
    //setting values of received data
    this.characterIndex = data.characterIndex;
    if (data.characterIndex == null) {
      this.characterIndex = 1;
    }
  }

  preload() {
    this.load.image("bg", "./assets/big-bg.png");
    this.load.image(
      `${Keys[this.characterIndex]}`,
      `./assets/${Keys[this.characterIndex]}128.png`
    );
    this.load.spritesheet("invader1", "./assets/c.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("explosion", "./assets/explosion-2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    console.log(Keys[this.characterIndex]);
    this.add.image(400, 300, "bg");

    const player = this.add.image(100, 100, Keys[this.characterIndex]);
    player.x = 400;
    player.y = 500;
    console.log("init is ", this.data);
    this.load.image("bg", "./assets/big-bg.png");
    this.load.spritesheet("invader1", "./assets/c.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    var invader1 = this.add.group({
      key: "invader1",
      frame: 0,
      repeat: 8,
      setXY: { x: 80, y: 100, stepX: 60 },
    });

    this.anims.create({
      key: "explosion",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 8,
      }),
      repeat: 0,
    });

    explosion = this.add.sprite(640, 360, "explosion");

    explosion.play("explosion");
  }

  //use .destroy to delete enemy after being shot + add above animation
}
