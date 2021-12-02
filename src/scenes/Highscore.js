import Phaser from 'phaser';
import { score } from './HelloWorldScene';

export default class Highscore extends Phaser.Scene {
  constructor() {
    super('Highscore');

    this.playerText;
  }

  preload() {
    this.load.image('block', 'assets/input/block.png');
    this.load.image('rub', 'assets/input/rub.png');
    this.load.image('end', 'assets/input/end.png');

    this.load.bitmapFont(
      'arcade',
      'assets/fonts/arcade.png',
      'assets/fonts/arcade.xml'
    );
  }

  create() {
    this.add
      .bitmapText(100, 260, 'arcade', 'RANK  SCORE   NAME')
      .setTint(0xff00ff);
    this.add.bitmapText(100, 310, 'arcade', `1ST   ${score}`).setTint(0xff0000);

    this.playerText = this.add
      .bitmapText(580, 310, 'arcade', '')
      .setTint(0xff0000);

    //  Do this, otherwise this Scene will steal all keyboard input
    this.input.keyboard.enabled = true;

    this.scene.launch('InputPanel');

    let panel = this.scene.get('InputPanel');

    //  Listen to events from the Input Panel scene
    panel.events.on('updateName', this.updateName, this);
    panel.events.on('submitName', this.submitName, this);

    this.add
      .text(400, 500, 'PRESS ENTER TO TRY AGAIN', {
        fontSize: '20px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.input.keyboard.once('keydown-ENTER', () => {
      console.log('enter down');
      // start title screen scene
      this.scene.stop('InputPanel');
      this.scene.start('title-screen');
    });
  }

  submitName() {
    this.scene.stop('InputPanel');

    this.add
      .bitmapText(100, 360, 'arcade', '2ND   40000    ANT')
      .setTint(0xff8200);
    this.add
      .bitmapText(100, 410, 'arcade', '3RD   30000    .-.')
      .setTint(0xffff00);
    this.add
      .bitmapText(100, 460, 'arcade', '4TH   20000    BOB')
      .setTint(0x00ff00);
    this.add
      .bitmapText(100, 510, 'arcade', '5TH   10000    ZIK')
      .setTint(0x00bfff);
  }

  updateName(name) {
    this.playerText.setText(name);
  }
}
