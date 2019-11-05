import 'phaser';
import Player from '../sprites/player';
import Command from '../utils/command';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.commands = [];
  }

  createKeyboardListener(keyName) {
    const key = keyName.toUpperCase();
    this.input.keyboard.on(`keydown_${key}`, () => {
      const command = new Command(`${keyName}Down`);
      this.commands.push(command);
      console.log(this.commands);
    });
    this.input.keyboard.on(`keyup_${key}`, () => {
      const command = new Command(`${keyName}Up`);
      this.commands.push(command);
      console.log(this.commands);
    });
  }

  create() {
    this.created = !this.created ? 1 : this.created += 1;
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.createKeyboardListener('left');
    this.createKeyboardListener('right');


    this.player = new Player({
      scene: this,
      key: 'player',
      x: 100,
      y: 100,
    });
  }
}
