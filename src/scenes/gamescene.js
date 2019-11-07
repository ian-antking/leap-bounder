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
    this.map = this.make.tilemap({ key: 'dev-map' });
    this.mapTiles = this.map.addTilesetImage('tilesheet_complete');
    this.groundLayer = this.map.createStaticLayer('ground', this.mapTiles)
      .setCollisionByProperty({ collides: true });
    this.waterLayer = this.map.createDynamicLayer('water', this.mapTiles)
      .setDepth(5);

    this.input.keyboard.on('keydown_' + 'SPACE', () => {
      this.player.flipGravity();
    });

    this.createKeyboardListener('left');
    this.createKeyboardListener('right');


    this.player = new Player({
      scene: this,
      key: 'player',
      x: 50,
      y: 50,
    });

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.player, this.groundLayer);
  }

  update() {
    this.player.update(this.commands.shift());
  }
}
