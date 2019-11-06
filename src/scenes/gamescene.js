import 'phaser';
import Player from '../sprites/player';
import Command from '../utils/command';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.commands = [];
  }

  createKeyboardListener(keyName, commandName = keyName) {
    const key = keyName.toUpperCase();
    this.input.keyboard.on(`keydown_${key}`, () => {
      const command = new Command(`${commandName}Down`);
      this.commands.push(command);
    });
    this.input.keyboard.on(`keyup_${key}`, () => {
      const command = new Command(`${commandName}Up`);
      this.commands.push(command);
    });
  }

  create() {
    this.created = !this.created ? 1 : this.created += 1;
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.createKeyboardListener('left');
    this.createKeyboardListener('right');
    this.createKeyboardListener('space', 'gravity');


    this.player = new Player({
      scene: this,
      key: 'player',
      x: 100,
      y: 100,
    });
  }

  update() {
    this.player.update(this.commands.shift());
  }
}
