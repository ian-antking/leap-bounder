/* eslint-disable babel/no-unused-expressions */
import 'phaser';
import GameSprite from './game-sprite';
import createAnimations from '../helpers/create-animation';
import playerAnimations from '../config/player-animations';
import createStateMachine from '../helpers/create-state-machine';
import playerStates from '../config/player-states';

class Player extends GameSprite {
  constructor(config) {
    super(config);
    this.stats = {
      speed: 200,
    };
    createAnimations(this, this.scene, playerAnimations);
    this.state = createStateMachine(this.scene, this, playerStates);
    this.state.setInitialState('stand');
    this.anims.play('stand', true);
    this.body.setSize(39, 48, true);
    this.body.setBounce(0);
    this.body.setCollideWorldBounds(true);
  }

  flipGravity() {
    if (this.onGround) {
      this.scene.physics.world.gravity.y *= -1;
    }
  }

  update(controls) {
    this.flipY = this.scene.physics.world.gravity.y < 0;
    this.anims.play(this.state.name, true);
    this.state.handleInput(controls);
  }
}

export default Player;
