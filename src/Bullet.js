import Phaser from 'phaser';

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'bullet');
  }

  shoot(x, y) {
    //this.scene.sound.play('shoot');
    this.setCollideWorldBounds(true);
    // @ts-ignore
    this.body.onWorldBounds = true;
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-350);
    // this.setGravityX(500);
  }

  deactivate() {
    this.disableBody(true, true);
  }
}
