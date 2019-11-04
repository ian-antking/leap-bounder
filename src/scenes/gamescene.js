import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.player = this.add.sprite(10, 10, 'hero');
  }
}
