import 'phaser';
import Player from '../sprites/player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.player = new Player({
      scene: this,
      key: 'player',
      x: 100,
      y: 100,
    });
  }
}
