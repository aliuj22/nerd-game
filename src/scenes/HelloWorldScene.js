import Phaser from "phaser";

import TitleScreen from "./TitleScreen";

const Keys = ["Julia", "Alex", "Redbull"];
var explosion, sky;
var scoreText;
var score = 0;
var scoreString = "";
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
    //background
    this.load.image("bg", "./assets/big-bg.png");

    //loading players character
    this.load.image(
      `${Keys[this.characterIndex]}`,
      `./assets/${Keys[this.characterIndex]}128.png`
    );

    //todo: replace with alexs enemies
    this.load.spritesheet("invader1", "./assets/c.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    //loading explosion animation
    this.load.spritesheet("explosion", "./assets/explosion-2.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    console.log(Keys[this.characterIndex]);

    //adding background(position, width, height, key)
    sky = this.add.tileSprite(500, 100, 1024, 1024, "bg");

    //adding chosen player
    const player = this.add.image(100, 100, Keys[this.characterIndex]);
    player.x = 400;
    player.y = 500;
    console.log("init is ", this.data);

    //todo: replace with alexs enemies
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

    //animation for explosions
    this.anims.create({
      key: "explosion",
      frameRate: 5,
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 8,
      }),
      repeat: 0,
    });

    if (score === 0) {
      //adding animation in specific location
      //TODO: change to where an enemy has been hit
      explosion = this.add.sprite(640, 360, "explosion");

      explosion.play("explosion", false);
      //once animation is played, remove the last frame
      explosion.once("animationcomplete", () => {
        console.log("animationcomplete");
        explosion.destroy();
      });
    }
    //todo: use .destroy to delete enemy after being shot + add above animation

    //the score
    scoreString = "Score: ";
    scoreText = this.add.text(10, 10, scoreString + score, {
      fontSize: "16px",
      fontFamily: '"Press Start 2P"',
    });

    // function collisionHandler(bullet, enemy) {
    //   //  When a bullet hits an alien we kill them both
    //   bullet.kill();
    //   enemy.kill();

    //   //  Increase the score
    //   score += 20;
    //   scoreText.text = scoreString + score;
    // }
  }

  update() {
    sky.tilePositionY += 0.8;
  }
}
