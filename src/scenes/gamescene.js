import 'phaser';
import createBackground from '../helpers/create-background';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    this.background = createBackground(this, {
      background: 'background',
    });
  }
}
