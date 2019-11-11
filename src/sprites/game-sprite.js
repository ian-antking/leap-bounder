import 'phaser';

class GameSprite extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    this.scene = config.scene;
    this.spriteKey = config.key;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.stats = {
      speed: 100,
    };
  }

  get alive() {
    return this.y < this.scene.map.heightInPixels && this.y > -200;
  }

  get onGround() {
    return this.body.blocked.down || this.body.blocked.up;
  }

  get contactDirection() {
    return Object.keys(this.body.touching).filter(direction => {
      return this.body.touching[direction];
    })[0];
  }

  get damage() {
    return this.stats.damage;
  }

  get facing() {
    return this.flipX === true ? 'left' : 'right';
  }

  get health() {
    return this.stats.health;
  }

  get speed() {
    return this.stats.speed;
  }

  get velocityX() {
    return this.body.velocity.x;
  }

  get velocityY() {
    return this.body.velocity.y;
  }

  addDelayedCall(time, callback, args, context) {
    return this.scene.time.delayedCall(time, callback, args, context);
  }

  move(direction, factor = 1) {
    switch (direction) {
      case 'left':
        this.body.setVelocityX((this.stats.speed * -1) * factor);
        this.flipX = true;
        break;
      case 'right':
        this.body.setVelocityX(this.stats.speed * factor);
        this.flipX = false;
        break;
      default:
        this.body.setVelocityX(0);
    }
  }
}

export default GameSprite;
