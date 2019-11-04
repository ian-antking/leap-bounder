import 'phaser';

const FULL = 16;
const HALF = 8;
const EMPTY = 24;

class Heart extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.setFrame(FULL);
    // this.scene.physics.world.disable(this);
    this.setScrollFactor(0);
    this.setDisplaySize(50, 50);
    this.scene.add.existing(this);
  }

  fullHeart() {
    this.setFrame(FULL);
  }

  halfHeart() {
    this.setFrame(HALF);
  }

  emptyHeart() {
    this.setFrame(EMPTY);
  }
}

export default Heart;
