/* eslint-disable babel/no-unused-expressions */
import 'phaser';
import GameSprite from './game-sprite';
import createAnimations from '../helpers/create-animation';
import playerAnimations from '../config/player-animations';
// import createStateMachine from '../helpers/create-state-machine';
// import playerStates from '../config/player-states';

class Player extends GameSprite {
  constructor(config) {
    super(config);
    this.stats = {
      HEART_VALUE: 2,
      maxHealth: 6,
      health: 6,
      speed: 200,
      jump: 500,
      attack: 1,
    };
    this.scene.physics.add.collider(this.scene.groundLayer, this);
    this.scene.physics.add.collider(this.scene.platformLayer, this);
    this.hazardCollider = this.scene.physics.add.collider(
      this, this.scene.hazardGroup,
      (_, hazard) => {
        if (this._detectValidAttack(hazard)) {
          hazard.damage(this.stats.attack);
        } else {
          this.state.setState('hurt', { damage: hazard.stats.damage, direction: hazard.contactDirection });
          hazard.attackReaction && hazard.attackReaction();
        }
      }
    );
    createAnimations(this, this.scene, playerAnimations);
    // this.state = createStateMachine(this.scene, this, playerStates);
    // this.state.setInitialState('idle');
    this.resetBody();
  }

  _detectValidAttack(target) {
    return this.attacking && this.facing === this.contactDirection && target.damage;
  }

  get attacking() {
    return this.state.name === 'attack' || this.state.name === 'kick' || this.state.name === 'shove';
  }

  addKeyListener(key, condition, callback) {
    this.scene.controls[key].once(condition, callback);
  }

  hurtBlink() {
    this.setAlpha(0);
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 100,
      ease: 'Linear',
      repeat: 15,
      onComplete: () => {
        this.hazardCollider.active = true;
      },
    });
  }

  attack() {
    if (this.facing === 'left') {
      this.body.setSize(80, 90);
      this.body.setOffset(0, 35);
    } else {
      this.body.setSize(80, 90);
      this.body.setOffset(14, 35);
    }
    this.move(this.facing, 0.2);
  }

  damage(damage, attackDirection) {
    this.hazardCollider.active = false;
    this.hurtBlink();
    if (attackDirection === 'up') {
      this.body.setVelocityY(damage * -100);
    } else {
      switch (attackDirection) {
        case 'left':
          this.body.setVelocityX(damage * -200);
          break;
        case 'right':
          this.body.setVelocityX(damage * 200);
          break;
      }
    }
    this.stats.health -= damage;
  }

  duck() {
    this.body.setSize(65, 70);
    this.body.setOffset(14, 55);
  }

  heal(health) {
    if ((this.stats.health + health) > this.stats.maxHealth) {
      this.stats.health = this.stats.maxHealth;
    } else {
      this.stats.health += health;
    }
  }

  resetBody() {
    this.body.setSize(65, 90);
    this.body.setOffset(14, 35);
  }

  update(controls) {
    this.anims.play(this.state.name, true);
    this.state.handleInput(controls);
  }
}

export default Player;
