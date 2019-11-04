import 'phaser';
import Heart from '../sprites/heart';

class HealthBar extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene, config.x, config.y);
    this.scene = config.scene;
    this.player = config.player.stats;

    for (let i = 0; i < this.player.maxHealth / 2; i += 1) {
      this.list.push(new Heart({
        scene: this.scene,
        key: 'hud',
        x: 50 + (i * 50),
        y: 50,
      }));
    }
  }

  update() {
    if ((this.player.maxHealth / this.player.HEART_VALUE) > this.list.length) {
      this.list.push(new Heart({
        scene: this.scene,
        key: 'hud',
        x: 50 + ((this.list.length) * 50),
        y: 50,
      }));
    }
    this.list.forEach((heart, index) => {
      const fullHearts = Math.floor(this.player.health / this.player.HEART_VALUE);
      const partHeart = this.player.health % 2;
      if (index < fullHearts) {
        heart.fullHeart();
      } else if (index === fullHearts && partHeart) {
        heart.halfHeart();
      } else {
        heart.emptyHeart();
      }
    });
  }
}

export default HealthBar;
