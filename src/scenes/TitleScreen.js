import Phaser from 'phaser';

import WebFontFile from './WebFontFile';

//import HelloWorldScene from '../scenes/HelloWorldScene';

const Alex_key = 'Alex';
const Julia_key = 'Julia';
const Redbull_key = 'Redbull';
const selector_key = 'selector';

let characters = [];
let selectedCharacterIndex = 0;
let characterSelector;
let selectedIndex;
var sky;

export default class TitleScreen extends Phaser.Scene {
  constructor() {
    super('title-screen');
  }
  preload() {
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts);

    this.load.image('bg', './assets/test.png');

    this.load.image('Alex_key', './assets/Alex128.png');
    this.load.image('Julia_key', './assets/Julia128.png');
    this.load.image('Redbull_key', './assets/redbull128.png');
    this.load.image('selector_key', './assets/selector.png');
  }

  create() {
    sky = this.add.tileSprite(500, 100, 1024, 1024, 'bg');

    const title = this.add.text(400, 100, 'Nerd Invaders', {
      fontSize: '38px',
      fontFamily: '"Press Start 2P"',
    });
    title.setOrigin(0.5, 0.5);

    const Alex = this.add.image(100, 100, 'Alex_key');
    const Julia = this.add.image(100, 100, 'Julia_key');
    const Redbull = this.add.image(100, 100, 'Redbull_key');
    characterSelector = this.add.image(110, 110, 'selector_key');

    // characterSelector.x = 400;
    // characterSelector.y = 300;
    Alex.x = 400;
    Alex.y = 300;

    Julia.x = 250;
    Julia.y = 300;

    Redbull.x = 550;
    Redbull.y = 300;

    characters.push(Julia);
    characters.push(Alex);
    characters.push(Redbull);
    console.log('characters are', characters);

    this.add
      .text(400, 500, '⬅️ ➡️ to select the character', {
        fontSize: '20px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 530, 'then press space to start', {
        fontSize: '20px',
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5);

    this.input.keyboard.once('keydown-SPACE', () => {
      console.log('space down');
      // sending data to next page
      this.scene.start('hello-world', {
        characterIndex: selectedIndex,
      });
    });
    this.cursors = this.input.keyboard.createCursorKeys();

    this.selectCharacter(1);
  }

  // handleContinue() {
  //   this.scene.start('hello-world', HelloWorldScene);
  // }
  selectCharacter(index) {
    const currentCharacter = characters[selectedCharacterIndex];

    const character = characters[index];

    characterSelector.x = character.x;
    characterSelector.y = character.y;

    selectedCharacterIndex = index;
  }

  selectNextCharacter(change) {
    selectedIndex = selectedCharacterIndex + change;
    if (selectedIndex >= characters.length) {
      selectedIndex = 0;
    } else if (selectedIndex < 0) {
      selectedIndex = characters.length - 1;
    }
    this.selectCharacter(selectedIndex);

    console.log('index is', selectedIndex);
  }

  update() {
    sky.tilePositionY += 0.5;

    const rightPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right);
    const leftPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left);

    if (rightPressed) {
      this.selectNextCharacter(1);
    } else if (leftPressed) {
      this.selectNextCharacter(-1);
    }
  }
}
