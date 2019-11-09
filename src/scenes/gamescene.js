import 'phaser';
import Player from '../sprites/player';
import Command from '../utils/command';
import defaultConfig from '../config/default-data';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.commands = [];
  }

  init(data) {
    this.data = data;
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

  changeSpawnFlag(spawnTile) {
    this.spawnLayer.putTileAt(189, spawnTile.x, spawnTile.y);
  }

  findSpawn(layer) {
    const spawn = this.data.spawn ? (
      layer.getTileAtWorldXY(this.data.spawn.x, this.data.spawn.y)
    ) : (
      layer.findByIndex(189)
    );
    this.setSpawn(spawn);
  }

  setSpawn(spawnTile) {
    this.spawn = {
      x: spawnTile.pixelX,
      y: spawnTile.pixelY + 48,
    };
    this.changeSpawnFlag(spawnTile);
  }

  create() {
    this.map = this.make.tilemap({ key: 'dev-map' });
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.physics.world.setBoundsCollision(true, true, false, false);
    this.mapTiles = this.map.addTilesetImage('tilesheet_complete');
    this.groundLayer = this.map.createStaticLayer('ground', this.mapTiles)
      .setCollisionByProperty({ collides: true });
    this.spawnLayer = this.map.createDynamicLayer('spawn', this.mapTiles);
    this.waterLayer = this.map.createDynamicLayer('water', this.mapTiles)
      .setDepth(5);

    this.findSpawn(this.spawnLayer);

    this.spawnLayer.setTileIndexCallback(190, (_, spawnTile) => this.setSpawn(spawnTile), this);

    this.input.keyboard.on('keydown_' + 'SPACE', () => {
      this.player.flipGravity();
    });

    this.createKeyboardListener('left');
    this.createKeyboardListener('right');

    this.player = new Player({
      scene: this,
      key: 'player',
      x: this.spawn.x,
      y: this.spawn.y,
    });

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.overlap(this.player, this.spawnLayer);
  }

  update() {
    if (!this.player.alive) {
      this.scene.restart({
        spawn: this.spawn,
      });
    }
    this.player.update(this.commands.shift());
  }
}
