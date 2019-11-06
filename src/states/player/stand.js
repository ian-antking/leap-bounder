import State from '../../utils/state';

class StandState extends State {
  constructor(name, sprite) {
    super(name, sprite);
  }

  enter() {
    this.sprite.move('stop');
  }

  execute(command) {
    if (Math.abs(this.sprite.velocityY) > 0) {
      return 'fall';
    }
    if (command) {
      return command.name === 'leftDown' || command.name === 'rightDown' ? 'walk' : this.name;
    }
    return this.name;
  }
}

export default StandState;
