import 'phaser';

export default class Bomb extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 300, 300, 'bomb');
    this.play('bomb');
  }

  throw(x, y) {
    this.enableBody(true, x, y, true, true);
    this.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    function random(min, max) {
      return Math.random() * (max - min) + min;
    }
    this.setVelocityY(random(200, 800));
  }

  deactivate() {
    this.disableBody(true, true);
  }
}
