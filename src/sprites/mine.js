import 'phaser';
import GameSprite from './game-sprite';

class Mine extends GameSprite {
  constructor(config) {
    super(config);
    this.stats = config.stats;
    this.body.setCollideWorldBounds(true);
  }

  update() {
    if (!this.body.blocked.none) {
      this.body.setVelocity(this.stats.velocityX *= -1, this.stats.velocityY *= -1);
    }
  }
}

export default Mine;
