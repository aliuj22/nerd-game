import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, "bullet");
  }

  shoot(x, y) {
    //this.scene.sound.play('shoot');
    this.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-300);
  }

  deactivate() {
    this.disableBody(true, true);
  }
}
// export default class Bullet extends Phaser.GameObjects.Image {
//   speed: number;
//   born: number;
//   direction: number;
//   xSpeed: number;
//   ySpeed: number;
//   constructor(scene: any, x: number, y: number) {
//   super(scene, x, y, 'bullet');
//   this.speed = 1;
//   this.born = 0;
//   this.direction = 0;
//   this.xSpeed = 0;
//   this.ySpeed = 0;
//   this.setSize(12, 12);
//   }
// }
