import 'phaser';
import Player from '../sprites/player';
import Mine from '../sprites/mine';
import Command from '../utils/command';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.commands = [];
    this.level = 0;
    this.levels = [
      'dev-map',
      'level1',
    ];
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

  gameOver() {
    this.time.delayedCall(250, () => {
      this.cameras.main.fade(250);
    }, [], this);

    this.time.delayedCall(500, () => {
      this.scene.restart({
        spawn: this.spawn,
      });
    }, [], this);
  }

  setSpawn(spawnTile) {
    this.spawn = {
      x: spawnTile.pixelX,
      y: spawnTile.pixelY + 48,
    };
    this.changeSpawnFlag(spawnTile);
  }

  create() {
    this.map = this.make.tilemap({ key: this.levels[this.level % this.levels.length] });
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      .setBoundsCollision(true, true, false, false);

    this.mapTiles = this.map.addTilesetImage('tilesheet_complete');
    this.groundLayer = this.map.createStaticLayer('ground', this.mapTiles)
      .setCollisionByProperty({ collides: true });

    this.spawnLayer = this.map.createDynamicLayer('spawn', this.mapTiles)
      .setTileIndexCallback(190, (_, spawnTile) => this.setSpawn(spawnTile), this);

    this.goalLayer = this.map.createDynamicLayer('goal', this.mapTiles);

    this.signs = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    this.spikes = this.physics.add.group({
      allowGravity: false,
      immovable: true,
      collideWorldBounds: true,
    });

    this.mines = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const signLayer = this.map.getObjectLayer('sign');
    const spikeLayer = this.map.getObjectLayer('spike');
    const mineLayer = this.map.getObjectLayer('mine');

    const signObjects = signLayer ? signLayer.objects : [];
    const spikeObjects = spikeLayer ? spikeLayer.objects : [];
    const mineObjects = mineLayer ? mineLayer.objects : [];

    signObjects.forEach(signObject => {
      const sign = this.signs.create(signObject.x, signObject.y - signObject.height, 'tilesheet_complete', 263)
        .setOrigin(0, 0);
      sign.flipY = signObject.flippedVertical;
      sign.body.setSize(32, 32, true);

      signObject.properties.forEach(property => {
        sign[property.name] = property.value;
      });
    });

    spikeObjects.forEach(spikeObject => {
      const spike = this.spikes.create(spikeObject.x, spikeObject.y - spikeObject.height, 'tilesheet_complete', 211)
        .setOrigin(0, 0);
      spike.flipY = spikeObject.flippedVertical;
      spike.body.setSize(64, 32, true).setOffset(0, spike.flipY ? 0 : 32);
    });

    mineObjects.forEach(mineObject => {
      const stats = {};

      mineObject.properties.forEach(property => {
        stats[property.name] = property.value;
      });

      const mine = new Mine({
        scene: this,
        key: 'enemies',
        x: mineObject.x + 32,
        y: mineObject.y - 32,
        stats: stats,
      });

      this.mines.add(mine);
      mine.body.setCollideWorldBounds(true);
      mine.body.setVelocity(mine.stats.velocityX, mine.stats.velocityY);
    });

    this.findSpawn(this.spawnLayer);

    this.goalLayer.setTileIndexCallback(59, (_, goal) => {
      this.goalLayer.removeTileAt(goal.x, goal.y);
      this.scene.restart({
        level: this.level += 1,
      });
    }, this);

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
    this.physics.add.collider(this.mines, this.groundLayer);
    this.physics.add.overlap(this.player, this.spikes, () => {
      this.gameOver();
    });
    this.physics.add.overlap(this.player, this.mines, () => {
      this.gameOver();
    });
    this.physics.add.overlap(this.player, this.spawnLayer);
    this.physics.add.overlap(this.player, this.goalLayer);
    this.physics.add.overlap(this.player, this.signs, (_, sign) => {
      this.add.text(sign.x, sign.y - 20, sign.message);
    });
  }

  update() {
    if (!this.player.alive) {
      this.gameOver();
    }
    this.mines.getChildren().forEach(mine => mine.update());
    this.player.update(this.commands.shift());
  }
}
