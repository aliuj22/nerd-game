import Phaser from 'phaser';
import { score } from './HelloWorldScene';

import { getFromFirebase } from '../firebase';

var username, highScore;

export default class Highscore extends Phaser.Scene {
  constructor() {
    super('Highscore');
  }

  preload() {
    this.load.bitmapFont(
      'arcade',
      'assets/fonts/arcade.png',
      'assets/fonts/arcade.xml'
    );
  }

  async create() {
    this.add
      .bitmapText(50, 50, 'arcade', 'RANK  SCORE  NAME')
      .setTint(0xff00ff);

    //   storeInFirebase(username, score);
    let highScore = await getFromFirebase();
    highScore.map((user, index) => {
      this.add
        .bitmapText(
          100,
          100 + index * 34,
          'arcade',
          `${index + 1}    ${user.score}   ${user.username}`
        )
        .setTint(0x00bfff);
      //this.add.text(400, 400 + index * 10, user.username + user.score);
    });

    // this.playerText = this.add
    //   .bitmapText(580, 310, 'arcade', '')
    //   .setTint(0xff0000);

    this.add
      .text(400, 500, 'PRESS ENTER TO TRY AGAIN', {
        fontSize: '20px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.input.keyboard.once('keydown-ENTER', () => {
      console.log('enter down');

      this.scene.start('title-screen');
    });

    // this.input.keyboard.once('keydown-SPACE', async () => {
    //   console.log('enter down');

    // });
  }
}
