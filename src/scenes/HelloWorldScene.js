let enemy1, enemy2, enemy3, enemy4, startGame;

import Phaser from "phaser";

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.image("bg", "./assets/big-bg.png");
    this.load.spritesheet("enemy1", "./assets/java.png", {
      frameWidth: 70,
      frameHeight: 70,
    });
    this.load.spritesheet("enemy2", "./assets/haskell.png", {
      frameWidth: 70,
      frameHeight: 70,
    });

    this.load.spritesheet("enemy3", "./assets/python.png", {
      frameWidth: 70,
      frameHeight: 70,
    });

    this.load.spritesheet("enemy4", "./assets/kotlin.png", {
      frameWidth: 70,
      frameHeight: 70,
    });
  }

  create() {
    this.add.image(400, 300, "bg");

    enemy1 = this.physics.add.group({
      key: "enemy1",
      frame: 0,
      repeat: 10,
      setXY: { x: 50, y: 60, stepX: 70 },
    });

    enemy2 = this.physics.add.group({
      key: "enemy2",
      frame: 0,
      repeat: 10,
      setXY: { x: 50, y: 100, stepX: 70 },
    });

    enemy3 = this.physics.add.group({
      key: "enemy3",
      frame: 0,
      repeat: 10,
      setXY: { x: 50, y: 140, stepX: 70 },
    });

    enemy4 = this.physics.add.group({
      key: "enemy4",
      frame: 0,
      repeat: 10,
      setXY: { x: 50, y: 180, stepX: 70 },
    });

  }
}

//    update (;) {
//      console.log(update)
//   startGame = true;
// };



